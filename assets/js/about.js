// ================================
// "Mehr erfahren"-Button
// ================================

// Button auswählen
const button = document.getElementById("toggleButton");

// Versteckten Text auswählen
const moreText = document.getElementById("moreText");

// Klick auf Button überwachen
button.addEventListener("click", function (event) {

    // Verhindert das Standardverhalten des Links
    event.preventDefault();

    // Prüfen ob Text sichtbar ist
    if (window.getComputedStyle(moreText).display === "none") {

        // Text anzeigen
        moreText.style.display = "block";

        // Buttontext ändern
        button.textContent = "Weniger anzeigen";

    } else {

        // Text ausblenden
        moreText.style.display = "none";

        // Ursprünglichen Text wiederherstellen
        button.textContent = "Mehr erfahren";

    }

});


// ================================
// Bilder-Slider
// ================================

// Alle Bilder auswählen
const slides = document.querySelectorAll(".slide");

// Pfeile auswählen
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Aktuelles Bild
let currentSlide = 0;

// Bild anzeigen
function showSlide(index) {

    // Alle Bilder ausblenden
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // Gewähltes Bild anzeigen
    slides[index].classList.add("active");
}

// Nächstes Bild
function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Vorheriges Bild
function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// Klick auf Pfeile
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Automatischer Bildwechsel alle 5 Sekunden
setInterval(nextSlide, 5000);