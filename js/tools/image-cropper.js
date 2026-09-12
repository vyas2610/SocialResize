/**
 * SocialResize - Dedicated Image Cropper Controller
 * Interactive aspect-ratio cropping, visual panning, and browser-side canvas export.
 */
class ImageCropperController {
  constructor() {
    this.engine = new ImageEngine();
    this.state = {
      image: null,
      meta: null,
      aspectRatio: "free", // 'free', '1:1', '4:5', '16:9', '9:16', '2:3', '3:2'
      cropW: 1080,
      cropH: 1080,
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      format: "JPG",
      quality: 0.85
    };

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initialPanX = 0;
    this.initialPanY = 0;

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.dropzone = document.getElementById("cropperDropzone");
    this.fileInput = document.getElementById("cropperFileInput");
    this.workbench = document.getElementById("cropperWorkbench");
    this.previewCanvas = document.getElementById("cropperPreviewCanvas");

    this.aspectButtons = document.querySelectorAll(".ratio-btn");
    this.zoomSlider = document.getElementById("cropZoomSlider");
    this.zoomValueLabel = document.getElementById("cropZoomValue");
    this.rotateBtn = document.getElementById("cropRotateBtn");
    this.resetBtn = document.getElementById("cropResetBtn");

    this.formatSelect = document.getElementById("cropFormatSelect");
    this.qualityGroup = document.getElementById("cropQualityGroup");
    this.qualitySlider = document.getElementById("cropQualitySlider");
    this.qualityValueLabel = document.getElementById("cropQualityValue");

    this.origDimensionsEl = document.getElementById("cropOrigDimensions");
    this.origSizeEl = document.getElementById("cropOrigSize");
    this.outputDimensionsEl = document.getElementById("cropOutputDimensions");
    this.outputSizeEl = document.getElementById("cropOutputSize");

    this.downloadBtn = document.getElementById("cropDownloadBtn");
    this.startOverBtn = document.getElementById("cropStartOverBtn");
    this.downloadSuccessBanner = document.getElementById("cropSuccessBanner");
    this.downloadAgainBtn = document.getElementById("cropDownloadAgainBtn");
    this.editAgainBtn = document.getElementById("cropEditAgainBtn");
    this.errorMessageEl = document.getElementById("cropperErrorMessage");
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

    // Aspect Ratio Buttons
    this.aspectButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.aspectButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        this.setAspectRatio(btn.getAttribute("data-ratio"));
      });
    });

    // Zoom
    this.zoomSlider?.addEventListener("input", (e) => {
      this.state.zoom = parseFloat(e.target.value);
      if (this.zoomValueLabel) this.zoomValueLabel.textContent = `${Math.round(this.state.zoom * 100)}%`;
      this.render();
      this.updateStats();
    });

    // Rotate
    this.rotateBtn?.addEventListener("click", () => {
      this.state.rotation = (this.state.rotation + 90) % 360;
      this.render();
      this.updateStats();
    });

    // Reset
    this.resetBtn?.addEventListener("click", () => {
      this.resetTransform();
    });

    // Format & Quality
    this.formatSelect?.addEventListener("change", (e) => {
      this.state.format = e.target.value;
      if (this.qualityGroup) {
        this.qualityGroup.style.display = this.state.format === "PNG" ? "none" : "block";
      }
      this.updateStats();
    });

    this.qualitySlider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      this.state.quality = val / 100;
      if (this.qualityValueLabel) this.qualityValueLabel.textContent = `${val}%`;
      this.updateStats();
    });

    // Actions
    this.downloadBtn?.addEventListener("click", () => this.handleDownload());
    this.downloadAgainBtn?.addEventListener("click", () => this.handleDownload());
    this.editAgainBtn?.addEventListener("click", () => {
      if (this.downloadSuccessBanner) this.downloadSuccessBanner.style.display = "none";
      this.workbench?.scrollIntoView({ behavior: "smooth" });
    });
    this.startOverBtn?.addEventListener("click", () => this.startOver());

    this.bindPan();
  }

  bindPan() {
    if (!this.previewCanvas) return;

    const startPan = (clientX, clientY) => {
      if (!this.state.image) return;
      this.isDragging = true;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.initialPanX = this.state.panX;
      this.initialPanY = this.state.panY;
      this.previewCanvas.classList.add("is-grabbing");
    };

    const movePan = (clientX, clientY) => {
      if (!this.isDragging) return;
      const rect = this.previewCanvas.getBoundingClientRect();
      const scaleX = this.previewCanvas.width / rect.width;
      const scaleY = this.previewCanvas.height / rect.height;

      this.state.panX = this.initialPanX + (clientX - this.dragStartX) * scaleX;
      this.state.panY = this.initialPanY + (clientY - this.dragStartY) * scaleY;
      this.render();
    };

    const endPan = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.previewCanvas.classList.remove("is-grabbing");
        this.updateStats();
      }
    };

    this.previewCanvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startPan(e.clientX, e.clientY);
    });
    window.addEventListener("mousemove", (e) => movePan(e.clientX, e.clientY));
    window.addEventListener("mouseup", endPan);

    this.previewCanvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) startPan(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
      if (this.isDragging && e.touches.length === 1) movePan(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchend", endPan);
  }

  async handleFile(file) {
    this.showError("");
    try {
      const { image, meta } = await this.engine.loadImageFile(file);
      this.state.image = image;
      this.state.meta = meta;

      if (this.origDimensionsEl) this.origDimensionsEl.textContent = `${meta.width} × ${meta.height} px`;
      if (this.origSizeEl) this.origSizeEl.textContent = ImageEngine.formatBytes(meta.size);

      this.setAspectRatio(this.state.aspectRatio);

      if (this.dropzone) this.dropzone.style.display = "none";
      if (this.workbench) {
        this.workbench.style.display = "grid";
        this.workbench.scrollIntoView({ behavior: "smooth" });
      }

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageUploaded("Image Cropper", meta.type);
      }
    } catch (err) {
      this.showError(err.message || "Failed to load image.");
    }
  }

  setAspectRatio(ratioStr) {
    this.state.aspectRatio = ratioStr;
    if (!this.state.image) return;

    const baseW = this.state.image.naturalWidth;
    const baseH = this.state.image.naturalHeight;

    if (ratioStr === "free") {
      this.state.cropW = baseW;
      this.state.cropH = baseH;
    } else {
      const [rW, rH] = ratioStr.split(":").map(Number);
      const targetRatio = rW / rH;

      // Determine dimension fitting within max 1600px
      const MAX_BOUND = 1600;
      if (targetRatio >= 1) {
        this.state.cropW = Math.min(MAX_BOUND, Math.max(800, baseW));
        this.state.cropH = Math.round(this.state.cropW / targetRatio);
      } else {
        this.state.cropH = Math.min(MAX_BOUND, Math.max(800, baseH));
        this.state.cropW = Math.round(this.state.cropH * targetRatio);
      }
    }

    if (this.outputDimensionsEl) {
      this.outputDimensionsEl.textContent = `${this.state.cropW} × ${this.state.cropH} px`;
    }

    this.resetTransform();
  }

  resetTransform() {
    this.state.zoom = 1.0;
    this.state.panX = 0;
    this.state.panY = 0;
    this.state.rotation = 0;
    if (this.zoomSlider) this.zoomSlider.value = 1.0;
    if (this.zoomValueLabel) this.zoomValueLabel.textContent = "100%";
    this.render();
    this.updateStats();
  }

  startOver() {
    this.state.image = null;
    this.state.meta = null;
    if (this.fileInput) this.fileInput.value = "";
    if (this.workbench) this.workbench.style.display = "none";
    if (this.dropzone) this.dropzone.style.display = "block";
    if (this.downloadSuccessBanner) this.downloadSuccessBanner.style.display = "none";
    this.showError("");
  }

  render() {
    if (!this.state.image || !this.previewCanvas) return;
    this.engine.renderToCanvas(this.previewCanvas, this.state.image, {
      targetWidth: this.state.cropW,
      targetHeight: this.state.cropH,
      fitMode: "fill",
      zoom: this.state.zoom,
      panX: this.state.panX,
      panY: this.state.panY,
      rotation: this.state.rotation,
      bgColor: "#ffffff"
    });
  }

  async updateStats() {
    if (!this.state.image) return;
    try {
      const result = await this.engine.exportImage(this.state.image, {
        targetWidth: this.state.cropW,
        targetHeight: this.state.cropH,
        fitMode: "fill",
        zoom: this.state.zoom,
        panX: this.state.panX,
        panY: this.state.panY,
        rotation: this.state.rotation,
        bgColor: "#ffffff",
        format: this.state.format,
        quality: this.state.quality
      });
      if (this.outputSizeEl) {
        this.outputSizeEl.textContent = ImageEngine.formatBytes(result.size);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async handleDownload() {
    if (!this.state.image) return;
    try {
      this.showError("");
      const result = await this.engine.exportImage(this.state.image, {
        targetWidth: this.state.cropW,
        targetHeight: this.state.cropH,
        fitMode: "fill",
        zoom: this.state.zoom,
        panX: this.state.panX,
        panY: this.state.panY,
        rotation: this.state.rotation,
        bgColor: "#ffffff",
        format: this.state.format,
        quality: this.state.quality
      });

      const cleanRatio = this.state.aspectRatio.replace(":", "-");
      const fileName = `socialresize-cropped-${cleanRatio}.${this.state.format.toLowerCase()}`;
      ImageEngine.triggerDownload(result.blob, fileName);

      if (this.downloadSuccessBanner) {
        this.downloadSuccessBanner.style.display = "block";
        const info = this.downloadSuccessBanner.querySelector(".download-file-info");
        if (info) {
          info.textContent = `${fileName} (${result.width}×${result.height} px, ${ImageEngine.formatBytes(result.size)})`;
        }
      }

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageDownloaded("Image Cropper", "custom", this.state.format);
      }
    } catch (err) {
      this.showError(err.message || "Failed to download cropped image.");
    }
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

window.ImageCropperController = ImageCropperController;
