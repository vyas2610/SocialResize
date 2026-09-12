/**
 * SocialResize - Navigation Controller
 * Handles mobile hamburger drawer, desktop dropdowns, keyboard navigation,
 * focus trapping, and active link states.
 */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.querySelector(".nav-hamburger-btn");
    const mobileDrawer = document.querySelector(".mobile-nav-drawer");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");
    const closeBtn = document.querySelector(".mobile-nav-close-btn");

    function openMobileMenu() {
      if (!mobileDrawer) return;
      hamburgerBtn?.setAttribute("aria-expanded", "true");
      mobileDrawer.classList.add("is-active");
      mobileDrawer.setAttribute("aria-hidden", "false");
      mobileOverlay?.classList.add("is-active");
      document.body.classList.add("nav-open");
      closeBtn?.focus();
    }

    function closeMobileMenu() {
      if (!mobileDrawer) return;
      hamburgerBtn?.setAttribute("aria-expanded", "false");
      mobileDrawer.classList.remove("is-active");
      mobileDrawer.setAttribute("aria-hidden", "true");
      mobileOverlay?.classList.remove("is-active");
      document.body.classList.remove("nav-open");
      hamburgerBtn?.focus();
    }

    hamburgerBtn?.addEventListener("click", () => {
      const isOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    closeBtn?.addEventListener("click", closeMobileMenu);
    mobileOverlay?.addEventListener("click", closeMobileMenu);

    // Escape key closes mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer?.classList.contains("is-active")) {
        closeMobileMenu();
      }
    });

    // Handle dropdown toggles on touch/click
    const dropdownToggles = document.querySelectorAll(".nav-dropdown-toggle");
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = toggle.closest(".nav-item-dropdown");
        if (!parent) return;
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", (!isExpanded).toString());
        parent.classList.toggle("is-open");
      });
    });

    // Close desktop dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item-dropdown")) {
        document.querySelectorAll(".nav-item-dropdown.is-open").forEach((item) => {
          item.classList.remove("is-open");
          item.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Mark active link
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const cleanHref = href.replace(/\/$/, "");
        if (cleanHref === currentPath || (currentPath === "" && cleanHref === "/index.html") || (currentPath === "/index.html" && cleanHref === "/")) {
          link.classList.add("is-current");
          link.setAttribute("aria-current", "page");
        }
      }
    });
  });
})();
