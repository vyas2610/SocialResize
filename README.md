# SocialResize – Free Social Media Image Resizer & Creator Toolkit

SocialResize is a modern, fast, and 100% privacy-first web application designed to help creators, photographers, digital marketers, and agencies resize, crop, convert, and optimize images for every major social media platform.

- **Website URL:** `https://YOUR-DOMAIN.com`
- **Architecture:** 100% Client-Side Static Site (HTML5, CSS3, Vanilla JavaScript)
- **Zero Server Uploads:** All image manipulations happen locally in your web browser using HTML5 Canvas.

---

## 🌟 Key Features

### 1. Dedicated Platform Resizers
Pre-configured dimensions, aspect ratios, and visual UI safe zones for all 8 major social networks:
- **Instagram:** Portrait Feed (1080x1350, 4:5), Square Feed (1080x1080, 1:1), Landscape (1080x566), Stories (1080x1920, 9:16), Reels (1080x1920 with 1:1 profile grid safe zones), Profile Photo (320x320).
- **YouTube:** HD Thumbnail (1280x720, 16:9) with duration timestamp safe zone and strict 2MB file limit management, Channel Banner (2560x1440), Channel Avatar (800x800).
- **Facebook:** Feed Posts (1200x630 landscape, 1080x1350 portrait), Page Cover (820x312 desktop / 640x360 mobile safe), Event Covers (1200x628), Stories (1080x1920).
- **LinkedIn:** Feed Post (1200x627 landscape, 1080x1350 portrait), Profile Banner (1584x396 with avatar obstruction safe zone), Company Banner (1128x191).
- **WhatsApp:** WhatsApp Status (1080x1920, 9:16) with compression control to bypass aggressive WhatsApp downsampling, Profile Picture (500x500).
- **X (Twitter):** Single Post (1600x900, 16:9), Multi-image grid optimization, Header Banner (1500x500 with avatar collision protection).
- **Pinterest:** Standard Pin (1000x1500, 2:3 vertical), Idea Pin (1080x1920, 9:16), Board Cover (600x600).
- **TikTok:** Photo Mode Slideshows (1080x1920, 9:16) with full-screen UI overlay safe zones, Profile Avatar (200x200).

### 2. Powerful Utility Tools
- **Custom Pixel Resizer:** Enter any custom pixel width and height with optional aspect ratio lock.
- **Visual Image Cropper:** Interactive visual cropping box with presets for 1:1, 4:5, 16:9, 9:16, 2:3, and 3:2.
- **JPG to PNG Converter:** Lossless image converter with immediate local download.
- **PNG to JPG Converter:** Convert PNGs to compact JPEGs with background matte color picker (preventing transparent black backgrounds) and compression quality slider.
- **WebP Image Converter:** Next-generation image conversion with live byte-size calculation.

### 3. In-Depth Guides Hub & Educational Content
Includes 20 comprehensive, technical guides covering social media aspect ratios, compression mechanics, safe zones, and platform algorithms.

---

## 🔒 Privacy & Client-Side Architecture

Unlike traditional image converters that upload private photos to remote cloud servers, SocialResize operates **100% inside the user's web browser**:
1. Files are opened locally into browser RAM via the HTML5 `FileReader` API.
2. Cropping, scaling, and canvas rotations are executed via the browser's hardware-accelerated 2D Canvas rendering engine (`CanvasRenderingContext2D`).
3. Downscaling utilizes high-quality bicubic smoothing (`imageSmoothingQuality = 'high'`).
4. Output blobs are generated locally via `canvas.toBlob()`, calculating real byte sizes in real time.
5. Downloads trigger browser-native object URLs (`URL.createObjectURL()`).
6. **Zero image data is ever transmitted to any backend, database, or third-party analytics service.**

---

## 📁 Project Structure

```text
SocialResize/
├── index.html                           # Homepage with live Resizer workbench
├── social-media-image-resizer.html      # Universal multi-platform resizer
├── social-media-image-sizes.html        # Master 2026 dimension cheat sheet table
│
├── instagram-image-resizer.html         # Dedicated platform tool pages
├── instagram-story-resizer.html
├── instagram-reel-resizer.html
├── youtube-thumbnail-resizer.html
├── facebook-image-resizer.html
├── linkedin-image-resizer.html
├── whatsapp-status-resizer.html
├── x-image-resizer.html
├── pinterest-image-resizer.html
├── tiktok-image-resizer.html
│
├── custom-image-resizer.html            # General utility tools
├── image-cropper.html
├── jpg-to-png.html
├── png-to-jpg.html
├── webp-converter.html
│
├── about.html                           # Information & legal pages
├── contact.html
├── privacy-policy.html
├── terms.html
├── disclaimer.html
├── 404.html
│
├── css/
│   ├── main.css                         # Design system, tokens, dark/light themes, header, footer
│   ├── tool.css                         # Resizer dropzones, viewports, toolbars, stat badges
│   └── guide.css                        # Article layouts, callout boxes, tables, guides grid
│
├── js/
│   ├── config.js                        # Domain, GA4, Search Console, and AdSense settings
│   ├── social-sizes.js                  # Central platform dimension database
│   ├── image-engine.js                  # HTML5 Canvas manipulation engine
│   ├── theme.js                         # Dark/Light mode switcher with localStorage sync
│   ├── analytics.js                     # Privacy-safe GA4 event tracker (zero image data)
│   ├── navigation.js                    # Mobile drawer, dropdowns, keyboard accessibility
│   ├── search.js                        # Instant search modal with Ctrl+K shortcut
│   ├── main.js                          # FAQ accordions, active nav states, copyright year
│   └── tools/
│       ├── image-resizer.js             # Resizer workbench controller
│       ├── image-cropper.js             # Visual cropper controller
│       └── image-converter.js           # Format converter controller
│
├── guides/                              # 20 High-quality creator tutorials & guides
│   ├── index.html                       # Guides directory hub
│   ├── instagram-image-sizes.html
│   ├── instagram-story-size.html
│   ├── instagram-reel-size.html
│   ├── youtube-thumbnail-size-guide.html
│   ├── facebook-image-size-guide.html
│   ├── linkedin-image-size-guide.html
│   ├── whatsapp-status-image-size-guide.html
│   ├── x-twitter-image-size-guide.html
│   ├── pinterest-pin-size-guide.html
│   ├── tiktok-image-size-guide.html
│   ├── jpg-vs-png-vs-webp.html
│   ├── how-to-resize-images-without-losing-quality.html
│   ├── how-to-reduce-image-file-size.html
│   ├── best-image-formats-for-social-media.html
│   ├── how-to-prepare-photos-for-instagram.html
│   ├── how-to-resize-images-on-mobile.html
│   ├── how-to-create-a-youtube-thumbnail.html
│   ├── how-to-optimize-images-for-social-media.html
│   ├── common-social-media-image-size-mistakes.html
│   └── social-media-image-dimensions-explained.html
│
├── assets/
│   └── favicon.svg                      # Brand vector favicon
├── robots.txt                           # Search engine crawling rules
├── sitemap.xml                          # Canonical XML sitemap (44 URLs)
├── netlify.toml                         # Security headers & cache rules for Netlify
└── README.md                            # Documentation and deployment guide
```

---

## 🚀 Running Locally

SocialResize requires zero build steps, zero node modules, and zero compilers.

### Option 1: Python Built-in Server
Run from the project root:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 2: Node.js (npx serve)
```bash
npx -y serve .
```

### Option 3: VS Code / IDE Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🛠️ Pre-Deployment Configuration Checklist

Before deploying to production, perform the following search-and-replace steps:

1. **Domain Name:**
   - Search for `https://YOUR-DOMAIN.com` across all HTML files, `robots.txt`, and `sitemap.xml`. Replace with your registered production domain (e.g., `https://socialresize.com`).
   - Update `SITE_DOMAIN` in `js/config.js`.

2. **Google Search Console Verification:**
   - Search for `YOUR_VERIFICATION_CODE` in the `<meta name="google-site-verification">` tags and replace it with your verification token provided by Search Console.

3. **Google Analytics 4 (Optional):**
   - Update `GA_MEASUREMENT_ID` in `js/config.js` with your GA4 ID (e.g., `G-XXXXXXXXXX`).

4. **Google AdSense (Optional):**
   - Update `ADSENSE_PUBLISHER_ID` in `js/config.js` (e.g., `ca-pub-XXXXXXXXXXXXXXXX`).

---

## 🌐 Deploying to Hosting Platforms

### Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com).
2. Click **"Add new site"** → **"Import an existing project"** (or connect your GitHub repository).
3. Set **Build command** to empty (none needed).
4. Set **Publish directory** to `.` (the project root).
5. The included `netlify.toml` file will automatically configure security headers, cache policies, and the custom 404 handler.

### Deploying to GitHub Pages
1. Push the codebase to a GitHub repository.
2. Navigate to repository **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose branch `main` (or `master`) and directory `/ (root)`.
5. Click **Save**.

---

## ⚙️ Updating Platform Dimensions

When social networks update their image requirements:
1. Open `js/social-sizes.js`.
2. Locate the platform key (e.g., `instagram.portrait` or `youtube.thumbnail`).
3. Update `width`, `height`, or `aspectRatio`.
4. The workbench controls, dropdown menus, and canvas preview boundaries will automatically synchronize across the entire website without any HTML modifications.

---

## 📄 License & Fair Use

SocialResize is released as an open creator toolkit. All brand names (Instagram, YouTube, Facebook, LinkedIn, TikTok, WhatsApp, X, Pinterest) are trademarks of their respective owners and used solely for nominative fair use to describe compatible image dimensions.
