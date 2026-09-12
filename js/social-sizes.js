/**
 * SocialResize - Centralized Social Media Dimensions & Specifications
 * Stores verified standard dimensions, aspect ratios, recommended formats,
 * and metadata for all supported social media platforms.
 */
const SOCIAL_PLATFORMS = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    brandColor: "#E1306C",
    toolUrl: "/instagram-image-resizer.html",
    presets: [
      {
        id: "portrait-post",
        name: "Portrait Post",
        width: 1080,
        height: 1350,
        aspectRatio: "4:5",
        recommendedFormat: "JPG",
        description: "Optimal for mobile feed display; occupies the most screen real estate.",
        toolUrl: "/instagram-image-resizer.html"
      },
      {
        id: "square-post",
        name: "Square Post",
        width: 1080,
        height: 1080,
        aspectRatio: "1:1",
        recommendedFormat: "JPG",
        description: "Classic grid format; perfect for photos, infographics, and quotes.",
        toolUrl: "/instagram-image-resizer.html"
      },
      {
        id: "landscape-post",
        name: "Landscape Post",
        width: 1080,
        height: 566,
        aspectRatio: "1.91:1",
        recommendedFormat: "JPG",
        description: "Horizontal layout for panoramic photos or widescreen captures.",
        toolUrl: "/instagram-image-resizer.html"
      },
      {
        id: "story",
        name: "Story",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Full-screen vertical format for 24-hour disappearing Stories.",
        toolUrl: "/instagram-story-resizer.html"
      },
      {
        id: "reel",
        name: "Reel Cover",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Vertical cover photo for Instagram Reels and video tab.",
        toolUrl: "/instagram-reel-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 320,
        height: 320,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Circular avatar displayed at 110x110 on mobile and 320x320 on desktop.",
        toolUrl: "/instagram-image-resizer.html"
      }
    ]
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    brandColor: "#1877F2",
    toolUrl: "/facebook-image-resizer.html",
    presets: [
      {
        id: "feed-post",
        name: "Feed Post",
        width: 1200,
        height: 630,
        aspectRatio: "1.91:1",
        recommendedFormat: "JPG",
        description: "Standard landscape post image optimized for timeline and shared links.",
        toolUrl: "/facebook-image-resizer.html"
      },
      {
        id: "story",
        name: "Story",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Full-screen vertical image for Facebook Stories.",
        toolUrl: "/facebook-image-resizer.html"
      },
      {
        id: "cover",
        name: "Page Cover",
        width: 820,
        height: 312,
        aspectRatio: "2.63:1",
        recommendedFormat: "PNG",
        description: "Banner display for business pages and personal profiles.",
        toolUrl: "/facebook-image-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 170,
        height: 170,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Square avatar cropped into a circle on your profile and newsfeed.",
        toolUrl: "/facebook-image-resizer.html"
      }
    ]
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    brandColor: "#FF0000",
    toolUrl: "/youtube-thumbnail-resizer.html",
    presets: [
      {
        id: "thumbnail",
        name: "Video Thumbnail",
        width: 1280,
        height: 720,
        aspectRatio: "16:9",
        recommendedFormat: "JPG",
        description: "Standard 720p HD preview thumbnail; maximum file size is 2MB.",
        toolUrl: "/youtube-thumbnail-resizer.html"
      },
      {
        id: "channel-banner",
        name: "Channel Banner",
        width: 2560,
        height: 1440,
        aspectRatio: "16:9",
        recommendedFormat: "JPG",
        description: "Full TV display size; safe area for text/logos is 1546x423 centered.",
        toolUrl: "/youtube-thumbnail-resizer.html"
      },
      {
        id: "shorts",
        name: "Shorts Thumbnail",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Vertical preview thumbnail for YouTube Shorts on mobile feeds.",
        toolUrl: "/youtube-thumbnail-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Icon",
        width: 800,
        height: 800,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Channel avatar displayed next to video titles and comments.",
        toolUrl: "/youtube-thumbnail-resizer.html"
      }
    ]
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    brandColor: "#0A66C2",
    toolUrl: "/linkedin-image-resizer.html",
    presets: [
      {
        id: "post",
        name: "Feed Post",
        width: 1200,
        height: 627,
        aspectRatio: "1.91:1",
        recommendedFormat: "JPG",
        description: "Standard feed graphic or article link preview thumbnail.",
        toolUrl: "/linkedin-image-resizer.html"
      },
      {
        id: "personal-cover",
        name: "Personal Profile Cover",
        width: 1584,
        height: 396,
        aspectRatio: "4:1",
        recommendedFormat: "PNG",
        description: "Panoramic header image displayed behind your profile photo.",
        toolUrl: "/linkedin-image-resizer.html"
      },
      {
        id: "company-cover",
        name: "Company Page Cover",
        width: 1128,
        height: 191,
        aspectRatio: "5.91:1",
        recommendedFormat: "PNG",
        description: "Corporate banner for LinkedIn business and organization pages.",
        toolUrl: "/linkedin-image-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 400,
        height: 400,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Professional headshot displayed in a circular frame.",
        toolUrl: "/linkedin-image-resizer.html"
      }
    ]
  },
  x: {
    id: "x",
    name: "X / Twitter",
    brandColor: "#000000",
    toolUrl: "/x-image-resizer.html",
    presets: [
      {
        id: "post-image",
        name: "Post Image",
        width: 1600,
        height: 900,
        aspectRatio: "16:9",
        recommendedFormat: "JPG",
        description: "Optimized timeline image that displays crisply without cropping.",
        toolUrl: "/x-image-resizer.html"
      },
      {
        id: "header",
        name: "Header Banner",
        width: 1500,
        height: 500,
        aspectRatio: "3:1",
        recommendedFormat: "JPG",
        description: "Panoramic profile banner displayed behind avatar.",
        toolUrl: "/x-image-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 400,
        height: 400,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Circular avatar shown alongside all tweets and replies.",
        toolUrl: "/x-image-resizer.html"
      }
    ]
  },
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp",
    brandColor: "#25D366",
    toolUrl: "/whatsapp-status-resizer.html",
    presets: [
      {
        id: "status",
        name: "Status",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Vertical full-screen story image for WhatsApp Status updates.",
        toolUrl: "/whatsapp-status-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 500,
        height: 500,
        aspectRatio: "1:1",
        recommendedFormat: "JPG",
        description: "Contact avatar shown in chat lists and user info.",
        toolUrl: "/whatsapp-status-resizer.html"
      }
    ]
  },
  pinterest: {
    id: "pinterest",
    name: "Pinterest",
    brandColor: "#BD081C",
    toolUrl: "/pinterest-image-resizer.html",
    presets: [
      {
        id: "pin",
        name: "Standard Pin",
        width: 1000,
        height: 1500,
        aspectRatio: "2:3",
        recommendedFormat: "JPG",
        description: "Optimal vertical ratio to maximize clicks in Pinterest feeds.",
        toolUrl: "/pinterest-image-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Picture",
        width: 165,
        height: 165,
        aspectRatio: "1:1",
        recommendedFormat: "PNG",
        description: "Circular board avatar on your Pinterest profile page.",
        toolUrl: "/pinterest-image-resizer.html"
      }
    ]
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    brandColor: "#00F2FE",
    toolUrl: "/tiktok-image-resizer.html",
    presets: [
      {
        id: "post",
        name: "Video / Photo Post",
        width: 1080,
        height: 1920,
        aspectRatio: "9:16",
        recommendedFormat: "JPG",
        description: "Vertical full-screen 9:16 image or slideshow frame for TikTok.",
        toolUrl: "/tiktok-image-resizer.html"
      },
      {
        id: "profile",
        name: "Profile Avatar",
        width: 200,
        height: 200,
        aspectRatio: "1:1",
        recommendedFormat: "JPG",
        description: "Profile photo shown on creator profile and feed overlay.",
        toolUrl: "/tiktok-image-resizer.html"
      }
    ]
  },
  custom: {
    id: "custom",
    name: "Custom Size",
    brandColor: "#6366F1",
    toolUrl: "/custom-image-resizer.html",
    presets: [
      {
        id: "custom-dimensions",
        name: "Custom Dimensions",
        width: 1200,
        height: 1200,
        aspectRatio: "1:1",
        recommendedFormat: "JPG",
        description: "Define any custom pixel width and height with optional aspect ratio lock.",
        toolUrl: "/custom-image-resizer.html"
      }
    ]
  }
};

/**
 * Helpers for dimension access and lookup
 */
const SocialSizes = {
  platforms: SOCIAL_PLATFORMS,

  getPlatform(platformId) {
    return SOCIAL_PLATFORMS[platformId] || null;
  },

  getPreset(platformId, presetId) {
    const platform = this.getPlatform(platformId);
    if (!platform) return null;
    return platform.presets.find(p => p.id === presetId) || platform.presets[0];
  },

  getAllPresets() {
    const list = [];
    Object.keys(SOCIAL_PLATFORMS).forEach(platKey => {
      const plat = SOCIAL_PLATFORMS[platKey];
      plat.presets.forEach(preset => {
        list.push({
          ...preset,
          platformId: plat.id,
          platformName: plat.name,
          brandColor: plat.brandColor
        });
      });
    });
    return list;
  },

  getPresetsByPlatform(platformId) {
    const platform = this.getPlatform(platformId);
    return platform ? platform.presets : [];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOCIAL_PLATFORMS, SocialSizes };
}
