// =====================================================
// HTML-ELEMENTE AUSWÄHLEN
// =====================================================

// Holt die Gärtner-Figur aus dem HTML-Dokument
const gaertner = document.getElementById("gaertner");

// Holt die Pflanze aus dem HTML-Dokument
const pflanze = document.getElementById("pflanze");

// Holt die Punkteanzeige
const scoreText = document.getElementById("score");

// Holt die Game-Over-Anzeige
const gameOver = document.getElementById("gameOver");


// =====================================================
// VARIABLEN
// =====================================================

// Speichert, ob der Gärtner gerade springt
let jumping = false;

// Aktuelle Punktzahl
let score = 0;

// Startposition der Pflanze
let pflanzePosition = 600;

// Gibt an, ob das Spiel läuft
let gameRunning = true;


// =====================================================
// TASTENABFRAGE
// =====================================================

// Reagiert auf Tastendrücke
document.addEventListener("keydown", function(event) {

    // Wenn die Leertaste gedrückt wird
    if (event.code === "Space") {
        jump();
    }

    // Wenn das Spiel vorbei ist und R gedrückt wird
    if (!gameRunning && event.key.toLowerCase() === "r") {
        location.reload(); // Seite neu laden
    }

});


// =====================================================
// SPRUNGFUNKTION
// =====================================================

function jump() {

    // Verhindert Doppelsprünge
    if (jumping) return;

    // Markiert, dass gerade gesprungen wird
    jumping = true;

    // Aktuelle Höhe des Sprungs
    let position = 0;

    // Figur bewegt sich nach oben
    const up = setInterval(() => {

        // Maximale Sprunghöhe erreicht?
        if (position >= 150) {

            // Aufwärtsbewegung stoppen
            clearInterval(up);

            // Abwärtsbewegung starten
            const down = setInterval(() => {

                // Wieder auf dem Boden?
                if (position <= 0) {

                    clearInterval(down);

                    // Springen beendet
                    jumping = false;

                } else {

                    // Schrittweise nach unten
                    position -= 5;

                    // Neue Position setzen
                    gaertner.style.bottom = position + "px";

                }

            }, 20);

        } else {

            // Schrittweise nach oben
            position += 5;

            // Neue Position setzen
            gaertner.style.bottom = position + "px";

        }

    }, 20);
}


// =====================================================
// PFLANZE BEWEGEN
// =====================================================

// Wird alle 20 Millisekunden ausgeführt
const pflanzeMove = setInterval(() => {

    // Falls Spiel vorbei ist → nichts tun
    if (!gameRunning) return;

    // Pflanze nach links bewegen
    pflanzePosition -= 6;

    // Hat die Pflanze den linken Rand verlassen?
    if (pflanzePosition < -50) {

        // Pflanze wieder rechts starten lassen
        pflanzePosition = 800;

        // Punktzahl erhöhen
        score++;

        // Neue Punktzahl anzeigen
        scoreText.textContent = "Punkte: " + score;
    }

    // Pflanze auf neue Position setzen
    pflanze.style.right = (800 - pflanzePosition) + "px";

}, 20);


// =====================================================
// KOLLISIONSPRÜFUNG
// =====================================================

// Prüft ständig, ob Pflanze und Gärtner zusammenstoßen
const collision = setInterval(() => {

    // Aktuelle Sprunghöhe des Gärtners auslesen
    const gaertnerBottom =
        parseInt(window.getComputedStyle(gaertner).bottom);

    // Linke Position der Pflanze ermitteln
    const pflanzeLeft =
        pflanze.getBoundingClientRect().left;

    // Linke Position des Gärtners ermitteln
    const gaertnerLeft =
        gaertner.getBoundingClientRect().left;

    // Prüfen, ob sich beide Objekte berühren
    if (
        pflanzeLeft < gaertnerLeft + 50 &&
        pflanzeLeft > gaertnerLeft &&
        gaertnerBottom < 50
    ) {

        // Spiel stoppen
        gameRunning = false;

        // Game-Over-Anzeige sichtbar machen
        gameOver.style.display = "block";

        // Bewegung der Pflanze stoppen
        clearInterval(pflanzeMove);

        // Kollisionsprüfung stoppen
        clearInterval(collision);
    }

}, 20);