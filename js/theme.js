/**
 * SocialResize - Theme Controller (Dark / Light Mode)
 * Persists user preference via localStorage and respects OS dark mode.
 */
(function () {
  const THEME_KEY = "socialresize_theme";
  const html = document.documentElement;

  // Retrieve saved preference or check OS preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Apply theme to DOM
  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  // Update button icons across the DOM
  function updateThemeToggleIcons(theme) {
    const toggles = document.querySelectorAll(".theme-toggle-btn");
    toggles.forEach((btn) => {
      btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      const icon = btn.querySelector(".theme-icon");
      if (icon) {
        icon.innerHTML = theme === "dark"
          ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
          : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    });
  }

  // Initial immediate application to prevent flash
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  // Bind toggles when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    updateThemeToggleIcons(getPreferredTheme());

    document.addEventListener("click", (e) => {
      const toggle = e.target.closest(".theme-toggle-btn");
      if (toggle) {
        const current = html.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        setTheme(next);
      }
    });

    // Listen for OS scheme change if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });

  window.SocialTheme = {
    get: () => html.getAttribute("data-theme"),
    set: setTheme
  };
})();
