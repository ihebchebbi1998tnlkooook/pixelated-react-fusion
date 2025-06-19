<?php

// Enable Cross-Origin Requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Email list
$emailList = [
    "erzerino2@gmail.com",
    "iheb.chebbi@lcieducation.net", // Added new recipient
];

// Email subject
$subject = "Découvrez notre nouveau site web optimisé !";

// Email content (HTML)
$htmlContent = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiori For You - Nouveau Site Web</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #740404;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            font-size: 26px;
            margin: 0;
        }
        .email-body {
            padding: 20px 30px;
            color: #333;
            line-height: 1.6;
        }
        .email-body p {
            margin: 15px 0;
        }
        .email-body a {
            color: #740404;
            text-decoration: none;
            font-weight: bold;
        }
        .email-body .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #740404;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 15px;
            font-size: 14px;
        }
        .email-footer a {
            color: #740404;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Fiori For You - Découvrez notre nouveau site web !</h1>
        </div>
        <div class="email-body">
            <p>Bonjour,</p>
            <p>Nous avons le plaisir de vous annoncer que notre site web est désormais de nouveau en ligne ! Après une période de maintenance, nous avons optimisé notre plateforme pour vous offrir une expérience plus fluide et agréable.</p>
            <p>Accédez dès maintenant à notre site en cliquant sur le lien suivant :</p>
            <a href="https://Fioriforyou.com" class="cta-button">Visitez notre site</a>
            <p>Découvrez nos nouvelles fonctionnalités, notamment :</p>
            <ul>
                <li><strong>Univers cadeaux</strong>: des sélections pensées pour vos besoins spécifiques.</li>
                <li><strong>Nouvelle catégorie Outlet</strong>: Profitez de réductions allant jusqu'à 70 %.</li>
            </ul>
            <p>De plus, bénéficiez de <strong>5 % de réduction de bienvenue</strong> et de la <strong>livraison gratuite dès 299D</strong>.</p>
            <p>Pour toute question, contactez-nous directement sur WhatsApp. Nous serons ravis de vous aider !</p>
        </div>
        <div class="email-footer">
            <p>Merci pour votre confiance !</p>
            <p>Bien cordialement,<br>L'équipe Fiori</p>
        </div>
    </div>
</body>
</html>
HTML;

// Email headers
$headers = "From: contact@fioriforyou.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

foreach ($emailList as $email) {
    echo "Sending to: $email...<br>";
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address: $email<br>";
        continue;
    }

    $isSent = @mail($email, $subject, $htmlContent, $headers);

    if ($isSent) {
        echo "Email successfully sent to: $email<br>";
    } else {
        echo "Failed to send email to: $email<br>";
        error_log("Failed to send email to $email", 3, "email_errors.log"); // Log errors to a file
    }


}

echo "<br>Done.";
?>
