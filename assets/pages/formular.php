<?php
// Fehlermeldungen anzeigen (nur für die Entwicklung)
error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * Funktion zur Bereinigung von Benutzereingaben
 * - entfernt Leerzeichen am Anfang und Ende
 * - schützt vor XSS-Angriffen
 */
function sanitize($data)
{
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Prüfen, ob das Formular abgesendet wurde
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // =========================
    // Formulardaten auslesen
    // =========================
    $full_name = sanitize($_POST["full-name"] ?? "");
    $email_address = sanitize($_POST["email-address"] ?? "");
    $room_type = sanitize($_POST["room-type"] ?? "");
    $room_image = sanitize($_POST["room-image"] ?? "");

    // =========================
    // Datenbankverbindung herstellen
    // =========================
    $servername = "localhost";
    $user = "luanapodojil";
    $password = "verdani2026@bbzw";
    $database = "luana-podojil_";

    $connection = new mysqli($servername, $user, $password, $database);

    // Verbindung prüfen
    if ($connection->connect_error) {
        die("Keine Verbindung zur Datenbank: " . $connection->connect_error);
    }

    // =========================
    // Daten in Datenbank speichern
    // =========================
    $insert_query = "
        INSERT INTO `Kontaktformular`
        (`Name`, `E-Mail Adresse`, `Raumtyp`, `Foto`)
        VALUES (?, ?, ?, ?)
    ";

    if ($stmt = $connection->prepare($insert_query)) {

        $stmt->bind_param(
            "ssss",
            $full_name,
            $email_address,
            $room_type,
            $room_image
        );

        // Prüfen, ob das Speichern erfolgreich war
        if ($stmt->execute()) {

            // =========================
            // Beliebtesten Raumtyp ermitteln
            // =========================
            $trend_query = "
                SELECT `Raumtyp`, COUNT(*) AS anzahl
                FROM `Kontaktformular`
                WHERE `Raumtyp` != ''
                GROUP BY `Raumtyp`
                ORDER BY anzahl DESC
                LIMIT 1
            ";

            $trend_result = $connection->query($trend_query);

            // Standardwerte
            $trend_title = "Wohnzimmer";
            $trend_text = "Entdecke passende Pflanzen in unserem Shop.";
            $trend_count = 0;

            // Falls ein Trend gefunden wurde
            if ($trend_result && $trend_result->num_rows > 0) {

                $trend_row = $trend_result->fetch_assoc();

                $trend_room = $trend_row["Raumtyp"];
                $trend_count = $trend_row["anzahl"];

                // Passende Texte je nach Raumtyp
                switch ($trend_room) {

                    case "living-room":
                        $trend_title = "Wohnzimmer";
                        $trend_text = "Aktuell interessieren sich besonders viele Kundinnen und Kunden für Pflanzen im Wohnzimmer. Entdecke passende Grünpflanzen für ein gemütliches Zuhause.";
                        break;

                    case "bedroom":
                        $trend_title = "Schlafzimmer";
                        $trend_text = "Pflanzen fürs Schlafzimmer liegen aktuell im Trend. Entdecke beruhigende und pflegeleichte Pflanzen.";
                        break;

                    case "office":
                        $trend_title = "Büro";
                        $trend_text = "Viele möchten ihren Arbeitsplatz begrünen. Entdecke robuste Pflanzen fürs Büro.";
                        break;

                    case "bathroom":
                        $trend_title = "Badezimmer";
                        $trend_text = "Badezimmer-Pflanzen erfreuen sich grosser Beliebtheit. Entdecke Pflanzen, die Feuchtigkeit lieben.";
                        break;
                }
            }

            // =========================
            // Bestätigungsseite anzeigen
            // =========================
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

                        <p>
                            Wir melden uns innerhalb von 2–3 Werktagen bei dir.
                        </p>

                        <div class='trend-box'>

                            <p class='trend-kicker'>
                                Aktueller Verdani-Trend
                            </p>

                            <h2>$trend_title</h2>

                            <p>$trend_text</p>

                            <p class='trend-count'>
                                $trend_count Beratungsanfragen zu diesem Raum
                            </p>

                            <a href='../pages/shop.html' class='button-secondary'>
                                Zum Shop
                            </a>

                        </div>

                    </section>

                </main>

            </body>
            </html>
            ";
        }

        // Falls das Speichern fehlgeschlagen ist
        else {
            echo "<p>Beim Speichern ist ein Fehler aufgetreten.</p>";
        }

        // Statement schliessen
        $stmt->close();
    }

    // Datenbankverbindung schliessen
    $connection->close();
}
?>
```
