<?php
// Funktion zur Bereinigung von Benutzereingaben (gegen XSS und unnötige Leerzeichen)
function sanitize($data)
{
    // Entfernt Leerzeichen und wandelt HTML-Sonderzeichen um
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Prüfen ob das Formular über POST abgeschickt wurde
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Eingaben aus dem Formular holen und bereinigen
    $full_name = sanitize($_POST["full-name"] ?? "");
    $email_address = sanitize($_POST["email-address"] ?? "");
    $room_type = sanitize($_POST["room-type"] ?? "");
    $room_image = sanitize($_POST["room-image"] ?? "");

    echo($full_name)

}