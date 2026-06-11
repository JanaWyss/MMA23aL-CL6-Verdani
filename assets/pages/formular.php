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


    //database connection
    $servername = 'localhost';
    $user = 'luanapodojil';
    $password = 'verdani2026@bbzw';
    $tabel = 'luana-podojil_';

    $connection = new mysqli($servername, $user, $password, $tabel);

    if($connection->connect_error) {
        die("Keine Verbindung zur Datenbank: ". mysqli_connect_error());
    }


    //upload data
    $new_message = "INSERT INTO `Kontaktformular`(`Name`, `E-Mail Adresse`, `Raumtyp`, `Foto`) VALUES (?,?,?,?)";

    // Bestätigungsnachricht

if ($stmt = $connection->prepare($new_message)) {
    $stmt->bind_param('ssss', $full_name, $email_address, $room_type, $room_image);

    if ($stmt->execute()) {
        echo "
        <!doctype html>
        <html lang='de'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Anfrage gesendet | Verdani</title>
                <link rel='stylesheet' href='../css/style.css'>
                <link rel='stylesheet' href='../css/formular-success.css'>
        </head>
        <body>
            <main class='confirmation-page'>
                <section class='confirmation-card'>
                    <h1>Vielen Dank, $full_name!</h1>
                    <p>Deine Anfrage wurde erfolgreich übermittelt.</p>
                    <p>Wir melden uns innerhalb von 2–3 Werktagen bei dir.</p>
                </section>
            </main>
        </body>
        </html>
        ";
    } else {
        echo "<p>Beim Speichern ist ein Fehler aufgetreten.</p>";
    }

    $stmt->close();
}

    $connection->close();
 

}