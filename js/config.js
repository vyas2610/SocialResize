/**
 * SocialResize - Site Configuration
 * Configure your Google Analytics 4 ID, Google Search Console Verification code,
 * and Google AdSense Client ID below.
 * Replace placeholder values with your production credentials when ready.
 */
const CONFIG = {
  // Replace with your Google Analytics 4 Measurement ID (e.g. G-1234567890)
  GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",

  // Replace with your Google Search Console HTML tag verification code
  GOOGLE_SITE_VERIFICATION: "YOUR_VERIFICATION_CODE",

  // Replace with your Google AdSense Publisher ID (e.g. ca-pub-1234567890123456)
  ADSENSE_CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX",

  // Production domain for canonical links and social share URLs
  PRODUCTION_DOMAIN: "https://YOUR-DOMAIN.com",

  // Administrative and support contact email
  SUPPORT_EMAIL: "deepakvyas261092@gmail.com"
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
