/**
 * SocialResize - Global App Initialization
 * Shared UI behaviors, FAQ accordion toggles, accessibility helpers.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Update all current year spans
  const yearSpans = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = currentYear;
  });

  // Accessible FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answerPanel = item.querySelector(".faq-answer");

    if (questionBtn && answerPanel) {
      questionBtn.addEventListener("click", () => {
        const isExpanded = questionBtn.getAttribute("aria-expanded") === "true";

        // Optional: close other accordions in the same group
        const group = item.closest(".faq-accordion");
        if (group && !group.hasAttribute("data-allow-multiple")) {
          group.querySelectorAll(".faq-item").forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("is-active");
              otherItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
            }
          });
        }

        questionBtn.setAttribute("aria-expanded", (!isExpanded).toString());
        item.classList.toggle("is-active", !isExpanded);
      });
    }
  });

  // Smooth scroll for anchor jump links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          targetEl.focus({ preventScroll: true });
        }
      }
    });
  });
});
