/**
 * SocialResize - Site-Wide Instant Search
 * Indexes tools, social platforms, presets, and guides with keyboard accessibility.
 */
(function () {
  const SEARCH_INDEX = [
    // Tools
    { title: "Social Media Image Resizer", category: "Tools", desc: "All-in-one multi-platform image resizer with platform presets.", url: "/social-media-image-resizer.html", keywords: "all tools multi platform resize crop fit convert" },
    { title: "Instagram Image Resizer", category: "Tools", desc: "Resize photos for Instagram portrait (4:5), square (1:1), and landscape feeds.", url: "/instagram-image-resizer.html", keywords: "instagram post portrait square ig photo feed" },
    { title: "Instagram Story Resizer", category: "Tools", desc: "Crop and resize images to 1080x1920 (9:16) for Instagram Stories.", url: "/instagram-story-resizer.html", keywords: "instagram story 1080x1920 9:16 vertical full screen" },
    { title: "Instagram Reel Resizer", category: "Tools", desc: "Prepare crisp 1080x1920 vertical cover images for Instagram Reels.", url: "/instagram-reel-resizer.html", keywords: "instagram reel reels video cover thumbnail 9:16" },
    { title: "YouTube Thumbnail Resizer", category: "Tools", desc: "Create high-CTR 1280x720 HD YouTube video thumbnails under 2MB.", url: "/youtube-thumbnail-resizer.html", keywords: "youtube thumbnail banner yt 1280x720 16:9 hd" },
    { title: "Facebook Image Resizer", category: "Tools", desc: "Resize images for Facebook timeline posts (1200x630), covers, and stories.", url: "/facebook-image-resizer.html", keywords: "facebook fb post banner cover story timeline" },
    { title: "LinkedIn Image Resizer", category: "Tools", desc: "Professional image resizer for LinkedIn posts (1200x627) and profile banners.", url: "/linkedin-image-resizer.html", keywords: "linkedin banner post business corporate cover job" },
    { title: "WhatsApp Status Resizer", category: "Tools", desc: "Format vertical 1080x1920 photos and graphics for WhatsApp Status updates.", url: "/whatsapp-status-resizer.html", keywords: "whatsapp status story 1080x1920 wa message" },
    { title: "X / Twitter Image Resizer", category: "Tools", desc: "Optimize images for X (Twitter) feed posts (1600x900) and profile headers.", url: "/x-image-resizer.html", keywords: "x twitter tweet post header banner 1600x900" },
    { title: "Pinterest Pin Resizer", category: "Tools", desc: "Create high-engagement 1000x1500 (2:3) vertical pins for Pinterest.", url: "/pinterest-image-resizer.html", keywords: "pinterest pin 1000x1500 2:3 vertical boards" },
    { title: "TikTok Image Resizer", category: "Tools", desc: "Resize vertical 1080x1920 images for TikTok photo posts and profile avatars.", url: "/tiktok-image-resizer.html", keywords: "tiktok photo post 1080x1920 vertical avatar" },
    { title: "Custom Image Resizer", category: "Tools", desc: "Resize any image to exact custom width and height with aspect ratio lock.", url: "/custom-image-resizer.html", keywords: "custom width height dimensions exact pixels lock aspect" },
    { title: "Image Cropper", category: "Tools", desc: "Crop photos visually with preset aspect ratios (1:1, 4:5, 16:9, 9:16, 2:3).", url: "/image-cropper.html", keywords: "crop image cropper cut trim visual rectangle square" },
    { title: "JPG to PNG Converter", category: "Tools", desc: "Convert JPG/JPEG images to lossless PNG format directly in your browser.", url: "/jpg-to-png.html", keywords: "convert jpg to png jpeg lossless format" },
    { title: "PNG to JPG Converter", category: "Tools", desc: "Convert PNG images to lightweight JPG format with custom quality compression.", url: "/png-to-jpg.html", keywords: "convert png to jpg jpeg compression reduce size" },
    { title: "WebP Converter", category: "Tools", desc: "Convert any image to modern high-efficiency WebP format with quality slider.", url: "/webp-converter.html", keywords: "convert webp next-gen google format compress" },
    { title: "Social Media Size Guide", category: "Reference", desc: "Complete master cheat sheet table with dimensions for all platforms.", url: "/social-media-image-sizes.html", keywords: "cheat sheet dimensions guide table sizes resolution" },

    // Guides
    { title: "Instagram Image Sizes: Complete Guide", category: "Guides", desc: "Detailed breakdown of Instagram feed, story, carousel, and reel resolutions.", url: "/guides/instagram-image-sizes.html", keywords: "instagram sizes dimensions feed guide" },
    { title: "Instagram Story Size and Dimensions", category: "Guides", desc: "Best practices, safe zones, and aspect ratio guide for 1080x1920 Stories.", url: "/guides/instagram-story-size.html", keywords: "instagram story safe zone 1080x1920 guide" },
    { title: "Instagram Reel Size and Dimensions", category: "Guides", desc: "How to format video covers and preview thumbnails for Instagram Reels.", url: "/guides/instagram-reel-size.html", keywords: "reel reels cover thumbnail dimensions" },
    { title: "YouTube Thumbnail Size Guide", category: "Guides", desc: "Dimensions, file size rules, safe margins, and tips for high-CTR thumbnails.", url: "/guides/youtube-thumbnail-size-guide.html", keywords: "youtube thumbnail guide ctr 1280x720" },
    { title: "Facebook Image Size Guide", category: "Guides", desc: "Comprehensive dimension cheat sheet for Facebook feed, cover, and stories.", url: "/guides/facebook-image-size-guide.html", keywords: "facebook dimensions feed banner post" },
    { title: "LinkedIn Image Size Guide", category: "Guides", desc: "Recommended resolutions for LinkedIn personal covers, company pages, and articles.", url: "/guides/linkedin-image-size-guide.html", keywords: "linkedin dimensions business banner post" },
    { title: "WhatsApp Status Image Size Guide", category: "Guides", desc: "How to post crisp, non-blurry status updates on WhatsApp.", url: "/guides/whatsapp-status-image-size-guide.html", keywords: "whatsapp status dimensions compression blur" },
    { title: "X/Twitter Image Size Guide", category: "Guides", desc: "Optimal aspect ratios for X cards, timeline feeds, and profile headers.", url: "/guides/x-twitter-image-size-guide.html", keywords: "x twitter image dimensions cards" },
    { title: "Pinterest Pin Size Guide", category: "Guides", desc: "Understanding the 2:3 vertical aspect ratio and optimal pin dimensions.", url: "/guides/pinterest-pin-size-guide.html", keywords: "pinterest pin dimensions 2:3 guide" },
    { title: "TikTok Image Size Guide", category: "Guides", desc: "Resolution guidelines for TikTok photo mode, slideshows, and profile covers.", url: "/guides/tiktok-image-size-guide.html", keywords: "tiktok photo mode dimensions vertical" },
    { title: "JPG vs PNG vs WebP", category: "Guides", desc: "Comparison of image formats, compression algorithms, and transparency support.", url: "/guides/jpg-vs-png-vs-webp.html", keywords: "comparison jpg png webp format difference quality" },
    { title: "How to Resize Images Without Losing Quality", category: "Guides", desc: "Practical techniques and resampling algorithms for maintaining sharpness.", url: "/guides/how-to-resize-images-without-losing-quality.html", keywords: "resize without losing quality blur sharp crisp" },
    { title: "How to Reduce Image File Size", category: "Guides", desc: "Step-by-step methods to compress images for faster web and app loading.", url: "/guides/how-to-reduce-image-file-size.html", keywords: "reduce file size compress mb kb speed" },
    { title: "Best Image Formats for Social Media", category: "Guides", desc: "When to choose JPG, PNG, or WebP across different social networks.", url: "/guides/best-image-formats-for-social-media.html", keywords: "best image formats social media choice" },
    { title: "How to Prepare Photos for Instagram", category: "Guides", desc: "Color spaces, sharp exports, and compression avoidance for Instagram.", url: "/guides/how-to-prepare-photos-for-instagram.html", keywords: "prepare photos instagram srgb export clean" },
    { title: "How to Resize Images on Mobile", category: "Guides", desc: "Using browser-based resizing tools on iPhone and Android smartphones.", url: "/guides/how-to-resize-images-on-mobile.html", keywords: "mobile phone iphone android resize" },
    { title: "How to Create a YouTube Thumbnail", category: "Guides", desc: "Design principles, typography, contrast, and dimensions for viral thumbnails.", url: "/guides/how-to-create-a-youtube-thumbnail.html", keywords: "create youtube thumbnail design typography ctr" },
    { title: "How to Optimize Images for Social Media", category: "Guides", desc: "The ultimate workflow for compression, cropping, and dimension tuning.", url: "/guides/how-to-optimize-images-for-social-media.html", keywords: "optimize images workflow tuning social" },
    { title: "Common Social Media Image Size Mistakes", category: "Guides", desc: "Pitfalls like stretching, awkward auto-crops, and excessive compression.", url: "/guides/common-social-media-image-size-mistakes.html", keywords: "mistakes stretch crop blurry compression" },
    { title: "Social Media Image Dimensions Explained", category: "Guides", desc: "Deep dive into aspect ratios, pixel density, Retina displays, and crop safe zones.", url: "/guides/social-media-image-dimensions-explained.html", keywords: "dimensions explained aspect ratio safe zones pixels" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    // Inject search modal markup if not already present
    if (!document.getElementById("searchModal")) {
      const modal = document.createElement("div");
      modal.id = "searchModal";
      modal.className = "search-modal-backdrop";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Site Search");
      modal.innerHTML = `
        <div class="search-modal-dialog">
          <div class="search-modal-header">
            <div class="search-input-wrap">
              <svg class="search-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="search" id="siteSearchInput" class="search-modal-input" placeholder="Search tools, platforms, sizes, guides..." autocomplete="off" />
              <button type="button" class="search-clear-btn" id="searchClearBtn" aria-label="Clear search">&times;</button>
            </div>
            <button type="button" class="search-close-btn" id="searchCloseBtn" aria-label="Close search (Esc)">ESC</button>
          </div>
          <div class="search-modal-results" id="searchResultsList" role="listbox">
            <div class="search-empty-state">Start typing to search tools, platforms, and guides...</div>
          </div>
          <div class="search-modal-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span><kbd>Enter</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const modalBackdrop = document.getElementById("searchModal");
    const searchInput = document.getElementById("siteSearchInput");
    const resultsContainer = document.getElementById("searchResultsList");
    const clearBtn = document.getElementById("searchClearBtn");
    const closeBtn = document.getElementById("searchCloseBtn");

    let activeIndex = -1;

    function openSearch() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.add("is-open");
      document.body.classList.add("search-open");
      searchInput?.focus();
      renderResults(searchInput?.value || "");
    }

    function closeSearch() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove("is-open");
      document.body.classList.remove("search-open");
      if (searchInput) searchInput.value = "";
      activeIndex = -1;
    }

    // Trigger button clicks
    document.addEventListener("click", (e) => {
      if (e.target.closest(".search-trigger-btn")) {
        openSearch();
      }
    });

    closeBtn?.addEventListener("click", closeSearch);
    clearBtn?.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
        renderResults("");
      }
    });

    modalBackdrop?.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeSearch();
      }
    });

    // Global keyboard shortcuts: Ctrl+K, Cmd+K, or /
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && modalBackdrop?.classList.contains("is-open")) {
        closeSearch();
      }
    });

    // Input filtering
    searchInput?.addEventListener("input", (e) => {
      const query = e.target.value;
      activeIndex = -1;
      renderResults(query);
      if (typeof window.SocialAnalytics !== "undefined" && query.length > 2) {
        window.SocialAnalytics.trackSearchUsed(query.length);
      }
    });

    // Keyboard navigation within results
    searchInput?.addEventListener("keydown", (e) => {
      const items = resultsContainer.querySelectorAll(".search-result-item");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActiveItem(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActiveItem(items);
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex]?.click();
      }
    });

    function updateActiveItem(items) {
      items.forEach((it, idx) => {
        if (idx === activeIndex) {
          it.classList.add("is-selected");
          it.scrollIntoView({ block: "nearest" });
        } else {
          it.classList.remove("is-selected");
        }
      });
    }

    function renderResults(rawQuery) {
      const query = rawQuery.trim().toLowerCase();
      if (!resultsContainer) return;

      if (!query) {
        resultsContainer.innerHTML = `
          <div class="search-category-header">Popular Tools</div>
          <div class="search-quick-links">
            <a href="/instagram-image-resizer.html" class="search-result-item">
              <span class="search-item-badge">Tool</span>
              <div class="search-item-content">
                <div class="search-item-title">Instagram Image Resizer</div>
                <div class="search-item-desc">Portrait, square, and landscape feed posts</div>
              </div>
            </a>
            <a href="/youtube-thumbnail-resizer.html" class="search-result-item">
              <span class="search-item-badge">Tool</span>
              <div class="search-item-content">
                <div class="search-item-title">YouTube Thumbnail Resizer</div>
                <div class="search-item-desc">1280x720 HD thumbnails under 2MB</div>
              </div>
            </a>
            <a href="/social-media-image-sizes.html" class="search-result-item">
              <span class="search-item-badge">Guide</span>
              <div class="search-item-content">
                <div class="search-item-title">Social Media Image Sizes Guide</div>
                <div class="search-item-desc">Master reference table for all platforms</div>
              </div>
            </a>
          </div>
        `;
        return;
      }

      const qTokens = query.split(/\s+/).filter(Boolean);
      const matches = SEARCH_INDEX.filter((item) => {
        const text = `${item.title} ${item.desc} ${item.keywords}`.toLowerCase();
        return qTokens.every((token) => text.includes(token));
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-no-results">
            <p>No matches found for "<strong>${escapeHtml(query)}</strong>"</p>
            <p class="search-subtext">Try searching for <em>Instagram, YouTube, Crop, WebP,</em> or <em>Dimensions</em>.</p>
          </div>
        `;
        return;
      }

      let html = "";
      matches.forEach((item, idx) => {
        html += `
          <a href="${item.url}" class="search-result-item" role="option" data-index="${idx}">
            <span class="search-item-badge search-badge-${item.category.toLowerCase()}">${item.category}</span>
            <div class="search-item-content">
              <div class="search-item-title">${highlightMatch(item.title, query)}</div>
              <div class="search-item-desc">${item.desc}</div>
            </div>
            <svg class="search-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        `;
      });
      resultsContainer.innerHTML = html;
    }

    function highlightMatch(text, query) {
      if (!query) return escapeHtml(text);
      const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
      return escapeHtml(text).replace(regex, "<mark>$1</mark>");
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  });
})();
