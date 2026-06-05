// =========================
// 1. Website ladet Animation
// =========================

window.addEventListener("DOMContentLoaded", () => {
  const loadElements = document.querySelectorAll(".fade-load");

  loadElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 200 * index);
  });
});

// =========================
// 2. SCROLL ANIMATION
// =========================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

// alle Scroll-Elemente beobachten
document.querySelectorAll(".scroll-anim").forEach((el) => {
  observer.observe(el);
});
