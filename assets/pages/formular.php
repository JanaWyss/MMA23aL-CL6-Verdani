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

    echo $full_name;

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

    if($stmt = $connection->prepare($new_message)) {
        $stmt->bind_param('ssss', $connection->real_escape_string($full_name), $connection->real_escape_string($email_address), $connection->real_escape_string($room_type), $connection->real_escape_string($room_image));
        $stmt->execute();
        $stmt->close();
    }
    //echo date("Y-m-d", time());
    $ergebnis = $connection->query($new_message);

    $connection->close;
 

}