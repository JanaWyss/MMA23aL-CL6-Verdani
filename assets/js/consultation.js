const form = document.getElementById("consulting-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let is_valid = true;

  const name = document.getElementById("full-name");
  const email = document.getElementById("email-address");
  const room = document.getElementById("room-type");
  const image = document.getElementById("room-image");

  clearErrors();

  // Name prüfen
  if (name.value.trim().length < 2) {
    showError(name, "Bitte mindestens 2 Zeichen eingeben.");

    is_valid = false;
  }

  // E-Mail prüfen
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email_pattern.test(email.value)) {
    showError(email, "Bitte eine gültige E-Mail-Adresse eingeben.");

    is_valid = false;
  }

  // Raumtyp prüfen
  if (room.value === "") {
    showError(room, "Bitte einen Raumtyp auswählen.");

    is_valid = false;
  }

  // Bild prüfen
  if (image.files.length > 0) {
    const file = image.files[0];

    const allowed_types = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed_types.includes(file.type)) {
      showError(image, "Nur JPG-, PNG- oder WEBP-Dateien erlaubt.");

      is_valid = false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError(image, "Die Datei darf maximal 5 MB gross sein.");

      is_valid = false;
    }
  }

  // Erfolgreich
  if (is_valid) {
    document.getElementById("success-message").classList.add("show");

    form.reset();
  }
});

function showError(field, message) {
  const error = field.parentElement.querySelector(".error-message");

  if (error) {
    error.textContent = message;
  }

  field.classList.add("input-error");
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
  });

  document.querySelectorAll(".input-error").forEach((input) => {
    input.classList.remove("input-error");
  });
}

// Popup schliessen
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("success-message").classList.remove("show");
});

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
