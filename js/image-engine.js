/**
 * SocialResize - Client-Side Image Engine
 * 100% browser-based HTML5 Canvas image manipulation.
 * Zero server uploads. Zero external processing dependencies.
 */
class ImageEngine {
  constructor() {
    this.currentImage = null;
    this.originalMeta = {
      name: "",
      type: "",
      size: 0,
      width: 0,
      height: 0
    };
  }

  /**
   * Load an image file into an HTMLImageElement
   * @param {File} file
   * @returns {Promise<{image: HTMLImageElement, meta: Object}>}
   */
  async loadImageFile(file) {
    if (!file) {
      throw new Error("No file provided.");
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      throw new Error(`Unsupported image format (${file.type || 'unknown'}). Please upload a JPG, PNG, or WebP image.`);
    }

    // Maximum file limit: 50MB for browser safety
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error("File is too large. Please select an image under 50MB.");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.currentImage = img;
          this.originalMeta = {
            name: file.name,
            type: file.type,
            size: file.size,
            width: img.naturalWidth,
            height: img.naturalHeight
          };
          resolve({ image: img, meta: this.originalMeta });
        };
        img.onerror = () => {
          reject(new Error("Failed to decode image data. The file may be corrupt."));
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        reject(new Error("Unable to read file from local disk."));
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Format byte count into human readable units
   */
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Calculate aspect ratio representation
   */
  static getAspectRatioString(width, height) {
    if (!width || !height) return "1:1";
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(Math.round(width), Math.round(height));
    const rW = Math.round(width) / divisor;
    const rH = Math.round(height) / divisor;
    if (rW > 50 || rH > 50) {
      return (width / height).toFixed(2) + ":1";
    }
    return `${rW}:${rH}`;
  }

  /**
   * Render image onto a target canvas based on transformation state
   * @param {HTMLCanvasElement} canvas Target canvas
   * @param {HTMLImageElement} img Source image
   * @param {Object} state Transformations
   */
  renderToCanvas(canvas, img, state) {
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const {
      targetWidth = 1080,
      targetHeight = 1080,
      fitMode = "fill", // 'fill' (cover) or 'fit' (contain)
      zoom = 1,
      panX = 0,
      panY = 0,
      rotation = 0, // 0, 90, 180, 270
      bgColor = "#ffffff"
    } = state;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Enable high quality image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill background
    ctx.clearRect(0, 0, targetWidth, targetHeight);
    if (bgColor && bgColor !== "transparent") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.save();

    // Move to center of target canvas
    ctx.translate(targetWidth / 2 + panX, targetHeight / 2 + panY);

    // Apply rotation
    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180);
    }

    // Determine dimensions when rotated 90 or 270 deg
    const isRotatedQuarter = (Math.abs(rotation) % 180) === 90;
    const srcW = isRotatedQuarter ? img.naturalHeight : img.naturalWidth;
    const srcH = isRotatedQuarter ? img.naturalWidth : img.naturalHeight;

    let baseScale = 1;
    if (fitMode === "fill") {
      // Cover the target bounds
      baseScale = Math.max(targetWidth / srcW, targetHeight / srcH);
    } else {
      // Contain within target bounds
      baseScale = Math.min(targetWidth / srcW, targetHeight / srcH);
    }

    const finalScale = baseScale * zoom;
    const drawW = img.naturalWidth * finalScale;
    const drawH = img.naturalHeight * finalScale;

    // Draw centered
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

    ctx.restore();
  }

  /**
   * Export the processed image as a Blob with real file size
   * @param {HTMLImageElement} img
   * @param {Object} state
   * @returns {Promise<{blob: Blob, dataUrl: string, size: number, width: number, height: number}>}
   */
  async exportImage(img, state) {
    const exportCanvas = document.createElement("canvas");
    this.renderToCanvas(exportCanvas, img, state);

    let mimeType = "image/jpeg";
    if (state.format === "PNG" || state.format === "image/png") {
      mimeType = "image/png";
    } else if (state.format === "WEBP" || state.format === "image/webp") {
      mimeType = "image/webp";
    }

    // Quality is only applicable to JPEG and WEBP
    const quality = mimeType === "image/png" ? undefined : (state.quality || 0.85);

    return new Promise((resolve, reject) => {
      exportCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Browser failed to create image blob."));
            return;
          }
          const dataUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            dataUrl,
            size: blob.size,
            width: exportCanvas.width,
            height: exportCanvas.height,
            mimeType
          });
        },
        mimeType,
        quality
      );
    });
  }

  /**
   * Trigger download of generated blob
   */
  static triggerDownload(blobOrUrl, fileName) {
    const link = document.createElement("a");
    link.href = typeof blobOrUrl === "string" ? blobOrUrl : URL.createObjectURL(blobOrUrl);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof blobOrUrl !== "string") {
      setTimeout(() => URL.revokeObjectURL(link.href), 10000);
    }
  }

  /**
   * Sanitize filename for download
   */
  static makeDownloadName(platform, presetName, format) {
    const cleanPlatform = (platform || "social").toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanPreset = (presetName || "resized").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const ext = format.toLowerCase().replace("jpeg", "jpg");
    return `socialresize-${cleanPlatform}-${cleanPreset}.${ext}`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageEngine;
}
