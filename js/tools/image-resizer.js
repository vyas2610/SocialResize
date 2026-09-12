/**
 * SocialResize - Image Resizer Interactive Tool Controller
 * Powers homepage resizer and all platform-specific resizer pages.
 */
class ImageResizerController {
  constructor(options = {}) {
    this.defaultPlatform = options.defaultPlatform || "instagram";
    this.defaultPreset = options.defaultPreset || "portrait-post";
    this.lockPlatform = options.lockPlatform || false;
    this.lockPreset = options.lockPreset || false;

    this.engine = new ImageEngine();
    this.state = {
      image: null,
      meta: null,
      platform: this.defaultPlatform,
      preset: this.defaultPreset,
      targetWidth: 1080,
      targetHeight: 1350,
      aspectLock: true,
      fitMode: "fill", // 'fill' (cover) or 'fit' (contain)
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      bgColor: "#ffffff",
      format: "JPG", // 'JPG', 'PNG', 'WEBP'
      quality: 0.85,
      lastExport: null
    };

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initialPanX = 0;
    this.initialPanY = 0;

    this.initElements();
    this.initPlatformAndPreset();
    this.bindEvents();
  }

  initElements() {
    this.dropzone = document.getElementById("resizerDropzone");
    this.fileInput = document.getElementById("resizerFileInput");
    this.workbench = document.getElementById("resizerWorkbench");
    this.previewCanvas = document.getElementById("resizerPreviewCanvas");
    this.canvasWrapper = document.getElementById("canvasWrapper");

    // Controls
    this.platformSelect = document.getElementById("platformSelect");
    this.presetSelect = document.getElementById("presetSelect");
    this.customWidthInput = document.getElementById("customWidth");
    this.customHeightInput = document.getElementById("customHeight");
    this.aspectLockToggle = document.getElementById("aspectLockToggle");
    this.customDimensionsPanel = document.getElementById("customDimensionsPanel");

    this.fitFillRadios = document.querySelectorAll('input[name="fitMode"]');
    this.bgColorInput = document.getElementById("bgColorInput");
    this.bgOptionWrap = document.getElementById("bgOptionWrap");

    this.zoomSlider = document.getElementById("zoomSlider");
    this.zoomValueLabel = document.getElementById("zoomValue");
    this.zoomInBtn = document.getElementById("zoomInBtn");
    this.zoomOutBtn = document.getElementById("zoomOutBtn");
    this.rotateBtn = document.getElementById("rotateBtn");
    this.resetBtn = document.getElementById("resetBtn");

    this.formatSelect = document.getElementById("formatSelect");
    this.qualityGroup = document.getElementById("qualityGroup");
    this.qualitySlider = document.getElementById("qualitySlider");
    this.qualityValueLabel = document.getElementById("qualityValue");

    // Stats
    this.origDimensionsEl = document.getElementById("origDimensions");
    this.origSizeEl = document.getElementById("origSize");
    this.targetDimensionsEl = document.getElementById("targetDimensions");
    this.estOutputSizeEl = document.getElementById("estOutputSize");

    // Actions
    this.downloadBtn = document.getElementById("downloadBtn");
    this.startOverBtn = document.getElementById("startOverBtn");
    this.downloadSuccessBanner = document.getElementById("downloadSuccessBanner");
    this.downloadAgainBtn = document.getElementById("downloadAgainBtn");
    this.editAgainBtn = document.getElementById("editAgainBtn");
    this.errorMessageEl = document.getElementById("resizerErrorMessage");
  }

  initPlatformAndPreset() {
    if (!this.platformSelect || !this.presetSelect) return;

    // Populate platform options if empty
    if (this.platformSelect.options.length === 0) {
      Object.keys(SOCIAL_PLATFORMS).forEach((key) => {
        const plat = SOCIAL_PLATFORMS[key];
        const opt = document.createElement("option");
        opt.value = plat.id;
        opt.textContent = plat.name;
        this.platformSelect.appendChild(opt);
      });
    }

    if (this.platformSelect) {
      this.platformSelect.value = this.defaultPlatform;
      if (this.lockPlatform) {
        this.platformSelect.disabled = true;
      }
    }

    this.updatePresetOptions(this.defaultPlatform, this.defaultPreset);

    if (this.presetSelect && this.lockPreset) {
      this.presetSelect.disabled = true;
    }

    this.syncPresetToState();
  }

  updatePresetOptions(platformId, selectedPresetId = null) {
    if (!this.presetSelect) return;
    this.presetSelect.innerHTML = "";

    const platform = SocialSizes.getPlatform(platformId);
    if (!platform) return;

    platform.presets.forEach((preset) => {
      const opt = document.createElement("option");
      opt.value = preset.id;
      opt.textContent = `${preset.name} (${preset.width} × ${preset.height} px)`;
      this.presetSelect.appendChild(opt);
    });

    if (selectedPresetId && platform.presets.some(p => p.id === selectedPresetId)) {
      this.presetSelect.value = selectedPresetId;
    } else {
      this.presetSelect.selectedIndex = 0;
    }

    // Toggle custom dimensions panel visibility
    if (this.customDimensionsPanel) {
      this.customDimensionsPanel.style.display = platformId === "custom" ? "grid" : "none";
    }
  }

  syncPresetToState() {
    const platformId = this.platformSelect?.value || this.defaultPlatform;
    const presetId = this.presetSelect?.value || this.defaultPreset;
    this.state.platform = platformId;
    this.state.preset = presetId;

    if (platformId === "custom") {
      const w = parseInt(this.customWidthInput?.value || 1200, 10);
      const h = parseInt(this.customHeightInput?.value || 1200, 10);
      this.state.targetWidth = isNaN(w) || w <= 0 ? 1200 : w;
      this.state.targetHeight = isNaN(h) || h <= 0 ? 1200 : h;
    } else {
      const preset = SocialSizes.getPreset(platformId, presetId);
      if (preset) {
        this.state.targetWidth = preset.width;
        this.state.targetHeight = preset.height;
        if (this.customWidthInput) this.customWidthInput.value = preset.width;
        if (this.customHeightInput) this.customHeightInput.value = preset.height;
      }
    }

    if (this.targetDimensionsEl) {
      this.targetDimensionsEl.textContent = `${this.state.targetWidth} × ${this.state.targetHeight} px`;
    }

    this.render();
    this.updateExportStats();
  }

  bindEvents() {
    // Dropzone drag & drop
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
      if (files && files.length > 0) {
        this.handleFile(files[0]);
      }
    });

    this.dropzone?.addEventListener("click", () => {
      this.fileInput?.click();
    });

    this.fileInput?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.handleFile(e.target.files[0]);
      }
    });

    // Platform & Preset selection
    this.platformSelect?.addEventListener("change", (e) => {
      this.updatePresetOptions(e.target.value);
      this.syncPresetToState();
      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackPlatformSelected(this.state.platform, this.state.preset);
      }
    });

    this.presetSelect?.addEventListener("change", () => {
      this.syncPresetToState();
      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackPlatformSelected(this.state.platform, this.state.preset);
      }
    });

    // Custom Width & Height
    this.customWidthInput?.addEventListener("input", (e) => {
      const newW = parseInt(e.target.value, 10);
      if (!isNaN(newW) && newW > 0) {
        if (this.state.aspectLock && this.state.targetWidth && this.state.targetHeight) {
          const ratio = this.state.targetHeight / this.state.targetWidth;
          const newH = Math.round(newW * ratio);
          this.state.targetHeight = newH;
          if (this.customHeightInput) this.customHeightInput.value = newH;
        }
        this.state.targetWidth = newW;
        this.syncPresetToState();
      }
    });

    this.customHeightInput?.addEventListener("input", (e) => {
      const newH = parseInt(e.target.value, 10);
      if (!isNaN(newH) && newH > 0) {
        if (this.state.aspectLock && this.state.targetWidth && this.state.targetHeight) {
          const ratio = this.state.targetWidth / this.state.targetHeight;
          const newW = Math.round(newH * ratio);
          this.state.targetWidth = newW;
          if (this.customWidthInput) this.customWidthInput.value = newW;
        }
        this.state.targetHeight = newH;
        this.syncPresetToState();
      }
    });

    this.aspectLockToggle?.addEventListener("click", () => {
      this.state.aspectLock = !this.state.aspectLock;
      this.aspectLockToggle.classList.toggle("is-active", this.state.aspectLock);
      this.aspectLockToggle.setAttribute("aria-pressed", this.state.aspectLock.toString());
    });

    // Fit vs Fill
    this.fitFillRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.state.fitMode = e.target.value;
        if (this.bgOptionWrap) {
          this.bgOptionWrap.style.display = this.state.fitMode === "fit" ? "flex" : "none";
        }
        this.render();
        this.updateExportStats();
      });
    });

    this.bgColorInput?.addEventListener("input", (e) => {
      this.state.bgColor = e.target.value;
      this.render();
      this.updateExportStats();
    });

    // Zoom Controls
    this.zoomSlider?.addEventListener("input", (e) => {
      this.state.zoom = parseFloat(e.target.value);
      if (this.zoomValueLabel) {
        this.zoomValueLabel.textContent = `${Math.round(this.state.zoom * 100)}%`;
      }
      this.render();
      this.updateExportStats();
    });

    this.zoomInBtn?.addEventListener("click", () => {
      const newZoom = Math.min(3.0, (this.state.zoom + 0.1).toFixed(2));
      this.setZoom(newZoom);
    });

    this.zoomOutBtn?.addEventListener("click", () => {
      const newZoom = Math.max(0.2, (this.state.zoom - 0.1).toFixed(2));
      this.setZoom(newZoom);
    });

    // Rotate
    this.rotateBtn?.addEventListener("click", () => {
      this.state.rotation = (this.state.rotation + 90) % 360;
      this.render();
      this.updateExportStats();
    });

    // Reset
    this.resetBtn?.addEventListener("click", () => {
      this.resetTransform();
    });

    // Format & Quality
    this.formatSelect?.addEventListener("change", (e) => {
      this.state.format = e.target.value;
      if (this.qualityGroup) {
        // PNG doesn't support quality slider in Canvas export
        this.qualityGroup.style.display = this.state.format === "PNG" ? "none" : "block";
      }
      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackFormatSelected(this.state.format);
      }
      this.updateExportStats();
    });

    this.qualitySlider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      this.state.quality = val / 100;
      if (this.qualityValueLabel) {
        this.qualityValueLabel.textContent = `${val}%`;
      }
      this.updateExportStats();
    });

    // Download
    this.downloadBtn?.addEventListener("click", () => {
      this.handleDownload();
    });

    this.downloadAgainBtn?.addEventListener("click", () => {
      this.handleDownload();
    });

    this.editAgainBtn?.addEventListener("click", () => {
      if (this.downloadSuccessBanner) this.downloadSuccessBanner.style.display = "none";
      if (this.workbench) {
        this.workbench.scrollIntoView({ behavior: "smooth" });
      }
    });

    this.startOverBtn?.addEventListener("click", () => {
      this.startOver();
    });

    // Interactive Drag / Pan on Canvas
    this.bindCanvasPan();
  }

  bindCanvasPan() {
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

      const deltaX = (clientX - this.dragStartX) * scaleX;
      const deltaY = (clientY - this.dragStartY) * scaleY;

      this.state.panX = this.initialPanX + deltaX;
      this.state.panY = this.initialPanY + deltaY;
      this.render();
    };

    const endPan = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.previewCanvas.classList.remove("is-grabbing");
        this.updateExportStats();
      }
    };

    // Mouse events
    this.previewCanvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      startPan(e.clientX, e.clientY);
    });

    window.addEventListener("mousemove", (e) => {
      movePan(e.clientX, e.clientY);
    });

    window.addEventListener("mouseup", endPan);

    // Touch events for mobile
    this.previewCanvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        startPan(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (this.isDragging && e.touches.length === 1) {
        movePan(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener("touchend", endPan);
  }

  async handleFile(file) {
    this.showError("");
    try {
      const { image, meta } = await this.engine.loadImageFile(file);
      this.state.image = image;
      this.state.meta = meta;

      // Update UI
      if (this.origDimensionsEl) {
        this.origDimensionsEl.textContent = `${meta.width} × ${meta.height} px`;
      }
      if (this.origSizeEl) {
        this.origSizeEl.textContent = ImageEngine.formatBytes(meta.size);
      }

      this.resetTransform();

      // Show workbench, hide dropzone
      if (this.dropzone) this.dropzone.style.display = "none";
      if (this.workbench) {
        this.workbench.style.display = "grid";
        this.workbench.scrollIntoView({ behavior: "smooth" });
      }

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageUploaded("Image Resizer", meta.type);
      }
    } catch (err) {
      this.showError(err.message || "Failed to load image.");
    }
  }

  setZoom(val) {
    this.state.zoom = parseFloat(val);
    if (this.zoomSlider) this.zoomSlider.value = val;
    if (this.zoomValueLabel) {
      this.zoomValueLabel.textContent = `${Math.round(val * 100)}%`;
    }
    this.render();
    this.updateExportStats();
  }

  resetTransform() {
    this.state.zoom = 1.0;
    this.state.panX = 0;
    this.state.panY = 0;
    this.state.rotation = 0;
    this.setZoom(1.0);
    this.render();
    this.updateExportStats();
  }

  startOver() {
    this.state.image = null;
    this.state.meta = null;
    this.state.lastExport = null;
    if (this.fileInput) this.fileInput.value = "";
    if (this.workbench) this.workbench.style.display = "none";
    if (this.dropzone) this.dropzone.style.display = "block";
    if (this.downloadSuccessBanner) this.downloadSuccessBanner.style.display = "none";
    this.showError("");
  }

  render() {
    if (!this.state.image || !this.previewCanvas) return;
    this.engine.renderToCanvas(this.previewCanvas, this.state.image, this.state);
  }

  async updateExportStats() {
    if (!this.state.image) return;
    try {
      const result = await this.engine.exportImage(this.state.image, this.state);
      this.state.lastExport = result;
      if (this.estOutputSizeEl) {
        this.estOutputSizeEl.textContent = ImageEngine.formatBytes(result.size);
      }
    } catch (err) {
      console.error("Export calculation error:", err);
    }
  }

  async handleDownload() {
    if (!this.state.image) {
      this.showError("Please upload an image before downloading.");
      return;
    }

    try {
      this.showError("");
      const result = await this.engine.exportImage(this.state.image, this.state);
      const presetObj = SocialSizes.getPreset(this.state.platform, this.state.preset);
      const presetName = presetObj ? presetObj.name : "custom";
      const fileName = ImageEngine.makeDownloadName(this.state.platform, presetName, this.state.format);

      ImageEngine.triggerDownload(result.blob, fileName);

      if (this.downloadSuccessBanner) {
        this.downloadSuccessBanner.style.display = "block";
        const fileInfo = this.downloadSuccessBanner.querySelector(".download-file-info");
        if (fileInfo) {
          fileInfo.textContent = `${fileName} (${result.width}×${result.height} px, ${ImageEngine.formatBytes(result.size)})`;
        }
      }

      if (typeof window.SocialAnalytics !== "undefined") {
        window.SocialAnalytics.trackImageDownloaded("Image Resizer", this.state.platform, this.state.format);
      }
    } catch (err) {
      this.showError(err.message || "Failed to process and download image.");
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

// Attach to window
window.ImageResizerController = ImageResizerController;
