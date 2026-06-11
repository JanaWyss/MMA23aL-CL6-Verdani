// 1. PAGE LOAD ANIMATION
// =========================

// HTML vollständig laden
window.addEventListener("DOMContentLoaded", () => {
  // Alle Elemente auswählen für den Seitenstart
  const loadElements = document.querySelectorAll(".fade-load");

  // Jedem Element nacheinander die Klasse .show hinzufügen
  // Elemente erscheinen nacheinander
  loadElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 200 * index);
  });
});

// =========================
// 2. SCROLL ANIMATION
// =========================

//  IntersectionObserver prüft, ob ein Element in den sichtbaren Bereich des Browserfensters gescrollt wurde
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Prüfe, ob das Element jetzt im sichtbaren Bereich ist
      if (entry.isIntersecting) {
        // Wenn ja, starte die Animation im CSS durch Hinzufügen von .visible
        entry.target.classList.add("visible");
      }
    });
  },
  {
    // Trigger, wenn mindestens 15% des Elements sichtbar ist
    threshold: 0.15,
  },
);

// alle Scroll-Elemente beobachten
document.querySelectorAll(".scroll-anim").forEach((el) => {
  observer.observe(el);
});
