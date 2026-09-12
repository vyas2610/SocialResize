/**
 * SocialResize - Dedicated Image Converter Controller
 * Powers /jpg-to-png.html, /png-to-jpg.html, and /webp-converter.html.
 */
class ImageConverterController {
  constructor(options = {}) {
    this.targetFormat = options.targetFormat || "PNG"; // 'PNG', 'JPG', 'WEBP'
    this.lockFormat = options.lockFormat || false;

    this.engine = new ImageEngine();
    this.state = {
      image: null,
      meta: null,
      format: this.targetFormat,
      quality: 0.9,
      bgColor: "#ffffff",
      lastResult: null
    };

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.dropzone = document.getElementById("converterDropzone");
    this.fileInput = document.getElementById("converterFileInput");
    this.workbench = document.getElementById("converterWorkbench");
    this.previewImg = document.getElementById("converterPreview");

    this.formatSelect = document.getElementById("convertFormatSelect");
    this.qualityGroup = document.getElementById("convertQualityGroup");
    this.qualitySlider = document.getElementById("convertQualitySlider");
    this.qualityValueLabel = document.getElementById("convertQualityValue");
    this.bgOptionWrap = document.getElementById("convertBgOptionWrap");
    this.bgColorInput = document.getElementById("convertBgColor");

    this.origDimensionsEl = document.getElementById("convertOrigDimensions");
    this.origSizeEl = document.getElementById("convertOrigSize");
    this.origFormatEl = document.getElementById("convertOrigFormat");
    this.outputDimensionsEl = document.getElementById("convertOutputDimensions");
    this.outputSizeEl = document.getElementById("convertOutputSize");
    this.outputFormatEl = document.getElementById("convertOutputFormat");

    this.downloadBtn = document.getElementById("convertDownloadBtn");
    this.startOverBtn = document.getElementById("convertStartOverBtn");
    this.downloadSuccessBanner = document.getElementById("convertSuccessBanner");
    this.downloadAgainBtn = document.getElementById("convertDownloadAgainBtn");
    this.errorMessageEl = document.getElementById("converterErrorMessage");

    if (this.formatSelect) {
      this.formatSelect.value = this.targetFormat;
      if (this.lockFormat) {
        this.formatSelect.disabled = true;
      }
    }
    this.updateControlsVisibility();
  }

  updateControlsVisibility() {
    if (this.qualityGroup) {
      this.qualityGroup.style.display = this.state.format === "PNG" ? "none" : "block";
    }
    if (this.bgOptionWrap) {
      // Background color is useful when converting PNG (potential alpha) to JPG
      this.bgOptionWrap.style.display = this.state.format === "JPG" ? "flex" : "none";
    }
    if (this.outputFormatEl) {
      this.outputFormatEl.textContent = this.state.format;
    }
  }

  bindEvents() {
    ["dragenter", "dragover"].forEach((eventName) => {
      this.dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dropzone.classList.add("is-dragover");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      this.dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dropzone.classList.remove("is-dragover");
      });
    });

    this.dropzone?.addEventListener("drop", (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) this.handleFile(files[0]);
    });

    this.dropzone?.addEventListener("click", () => this.fileInput?.click());
    this.fileInput?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) this.handleFile(e.target.files[0]);
    });

    this.formatSelect?.addEventListener("change", (e) => {
      this.state.format = e.target.value;
      this.updateControlsVisibility();
      this.updateConversion();
    });

    this.qualitySlider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      this.state.quality = val / 100;
      if (this.qualityValueLabel) this.qualityValueLabel.textContent = `${val}%`;
      this.updateConversion();
    });

    this.bgColorInput?.addEventListener("input", (e) => {
      this.state.bgColor = e.target.value;
      this.updateConversion();
    });

    this.downloadBtn?.addEventListener("click", () => this.handleDownload());
    this.downloadAgainBtn?.addEventListener("click", () => this.handleDownload());
    this.startOverBtn?.addEventListener("click", () => this.startOver());
  }

  async handleFile(file) {
    this.showError("");
    try {
      const { image, meta } = await this.engine.loadImageFile(file);
      this.state.image = image;
      this.state.meta = meta;

      if (this.previewImg) this.previewImg.src = image.src;
      if (this.origDimensionsEl) this.origDimensionsEl.textContent = `${meta.width} × ${meta.height} px`;
      if (this.origSizeEl) this.origSizeEl.textContent = ImageEngine.formatBytes(meta.size);
      if (this.origFormatEl) this.origFormatEl.textContent = meta.type.replace("image/", "").toUpperCase();
      if (this.outputDimensionsEl) this.outputDimensionsEl.textContent = `${meta.width} × ${meta.height} px`;

      if (this.dropzone) this.dropzone.style.display = "none";
      if (this.workbench) {
        this.workbench.style.display = "grid";
        this.workbench.scrollIntoView({ behavior: "smooth" });
      }

      await this.updateConversion();

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageUploaded("Image Converter", meta.type);
      }
    } catch (err) {
      this.showError(err.message || "Failed to load image.");
    }
  }

  async updateConversion() {
    if (!this.state.image) return;
    try {
      const result = await this.engine.exportImage(this.state.image, {
        targetWidth: this.state.image.naturalWidth,
        targetHeight: this.state.image.naturalHeight,
        fitMode: "fill",
        zoom: 1.0,
        panX: 0,
        panY: 0,
        rotation: 0,
        bgColor: this.state.bgColor,
        format: this.state.format,
        quality: this.state.quality
      });

      this.state.lastResult = result;
      if (this.outputSizeEl) {
        this.outputSizeEl.textContent = ImageEngine.formatBytes(result.size);
      }
      if (this.outputFormatEl) {
        this.outputFormatEl.textContent = this.state.format;
      }
    } catch (err) {
      console.error("Conversion preview failed:", err);
    }
  }

  handleDownload() {
    if (!this.state.lastResult) return;
    try {
      const baseName = this.state.meta.name.replace(/\.[^/.]+$/, "");
      const ext = this.state.format.toLowerCase().replace("jpeg", "jpg");
      const fileName = `socialresize-${baseName}.${ext}`;

      ImageEngine.triggerDownload(this.state.lastResult.blob, fileName);

      if (this.downloadSuccessBanner) {
        this.downloadSuccessBanner.style.display = "block";
        const info = this.downloadSuccessBanner.querySelector(".download-file-info");
        if (info) {
          info.textContent = `${fileName} (${this.state.lastResult.width}×${this.state.lastResult.height} px, ${ImageEngine.formatBytes(this.state.lastResult.size)})`;
        }
      }

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageDownloaded("Image Converter", "format-conversion", this.state.format);
      }
    } catch (err) {
      this.showError(err.message || "Failed to download converted file.");
    }
  }

  startOver() {
    this.state.image = null;
    this.state.meta = null;
    this.state.lastResult = null;
    if (this.fileInput) this.fileInput.value = "";
    if (this.workbench) this.workbench.style.display = "none";
    if (this.dropzone) this.dropzone.style.display = "block";
    if (this.downloadSuccessBanner) this.downloadSuccessBanner.style.display = "none";
    this.showError("");
  }

  showError(msg) {
    if (!this.errorMessageEl) return;
    if (msg) {
      this.errorMessageEl.textContent = msg;
      this.errorMessageEl.style.display = "block";
    } else {
      this.errorMessageEl.textContent = "";
      this.errorMessageEl.style.display = "none";
    }
  }
}

window.ImageConverterController = ImageConverterController;
