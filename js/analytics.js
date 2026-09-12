/**
 * SocialResize - Analytics Integration
 * Safe Google Analytics 4 event tracking.
 * PRIVACY GUARANTEE: Never transmits images, file contents, filenames, or personal data.
 * Functions safely as a no-op if GA4_MEASUREMENT_ID is not configured.
 */
(function () {
  const measurementId = typeof CONFIG !== "undefined" && CONFIG.GA4_MEASUREMENT_ID
    ? CONFIG.GA4_MEASUREMENT_ID
    : "G-XXXXXXXXXX";

  const isConfigured = measurementId && measurementId !== "G-XXXXXXXXXX";

  // Initialize GA4 tag only if real ID is provided
  if (isConfigured && !window.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure"
    });
  }

  // Safe wrapper that logs in dev or dispatches in production
  function trackEvent(eventName, params = {}) {
    // Strip any sensitive parameters
    const safeParams = {};
    const allowedKeys = [
      "tool_name",
      "platform",
      "preset",
      "format",
      "quality",
      "search_term_length",
      "fit_mode"
    ];

    Object.keys(params).forEach((k) => {
      if (allowedKeys.includes(k) && typeof params[k] !== "object") {
        safeParams[k] = params[k];
      }
    });

    if (isConfigured && typeof window.gtag === "function") {
      window.gtag("event", eventName, safeParams);
    }
  }

  window.SocialAnalytics = {
    trackToolUsed(toolName) {
      trackEvent("tool_used", { tool_name: toolName });
    },
    trackImageUploaded(toolName, format) {
      trackEvent("image_uploaded", { tool_name: toolName, format });
    },
    trackPlatformSelected(platform, preset) {
      trackEvent("platform_selected", { platform, preset });
    },
    trackImageResized(toolName, platform, preset) {
      trackEvent("image_resized", { tool_name: toolName, platform, preset });
    },
    trackImageDownloaded(toolName, platform, format) {
      trackEvent("image_downloaded", { tool_name: toolName, platform, format });
    },
    trackFormatSelected(format) {
      trackEvent("format_selected", { format });
    },
    trackSearchUsed(queryLength) {
      trackEvent("search_used", { search_term_length: queryLength });
    }
  };
})();
