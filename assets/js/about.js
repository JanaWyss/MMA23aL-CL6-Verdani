// Sucht das HTML-Element mit der ID "toggleButton"
// und speichert es in der Variable "button".
const button = document.getElementById("toggleButton");

// Sucht das HTML-Element mit der ID "moreText"
// und speichert es in der Variable "moreText".
const moreText = document.getElementById("moreText");

// Fügt dem Button einen Klick-Event-Listener hinzu.
// Der Code innerhalb der Funktion wird jedes Mal ausgeführt,
// wenn der Benutzer auf "Mehr erfahren" klickt.
button.addEventListener("click", function (event) {

    // Verhindert das Standardverhalten des Links (<a>).
    // Ohne diese Zeile würde der Browser beim Klicken
    // möglicherweise zur Seitenoberseite springen.
    event.preventDefault();

    // Prüft den tatsächlich berechneten Anzeigestatus des Elements.
    // "none" bedeutet, dass das Element aktuell unsichtbar ist.
    if (window.getComputedStyle(moreText).display === "none") {

        // Macht den versteckten Text sichtbar.
        // "block" zeigt das Element als Blockelement an.
        moreText.style.display = "block";

        // Ändert den Text des Buttons,
        // damit der Benutzer den Text wieder ausblenden kann.
        button.textContent = "Weniger anzeigen";

    } else {

        // Falls der Text bereits sichtbar ist,
        // wird er wieder ausgeblendet.
        moreText.style.display = "none";

        // Setzt den ursprünglichen Button-Text zurück.
        button.textContent = "Mehr erfahren";
    }
});