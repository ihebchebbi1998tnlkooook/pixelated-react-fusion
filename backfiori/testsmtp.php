[Enter code here] <?php
// Autoriser les requêtes cross-origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gérer la requête OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Couleurs pour l'email
$mainColor = "#A13737"; // Couleur principale
$secondaryColor = "#FFFFFF"; // Couleur secondaire (blanc)
$textColor = "#000000"; // Couleur du texte (noir)

// Obtenir les données POST brutes
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Valider le JSON
if (!$data || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["erreur" => "JSON invalide reçu."]);
    exit;
}

// Extraire les détails de l'utilisateur
$userDetails = $data['user_details'] ?? [];
$emailTo = $userDetails['email'] ?? '';
$fullName = ($userDetails['first_name'] ?? '') . ' ' . ($userDetails['last_name'] ?? '');
$orderNote = $userDetails['order_note'] ?? ''; 

// Valider l'email
if (!filter_var($emailTo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["erreur" => "Adresse email invalide."]);
    exit;
}

// Extraire les détails de la commande
$orderId = $data['order_id'] ?? 'N/A';
$items = $data['items'] ?? [];
$priceDetails = $data['price_details'] ?? [];
$payment = $data['payment'] ?? [];

// Construire le contenu de l'email
$messageHtml = '<html><body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">';
$messageHtml .= '<div style="background-color:' . $mainColor . '; color:' . $secondaryColor . '; padding: 40px; text-align: center; font-size: 30px;">';
$messageHtml .= '<h1>Merci pour votre commande!</h1>';
$messageHtml .= '<p>Numéro de commande: <strong>' . htmlspecialchars($orderId) . '</strong></p>';
$messageHtml .= '</div>';
$messageHtml .= '<div style="max-width: 600px; margin: 20px auto; background-color: ' . $secondaryColor . '; padding: 20px; border-radius: 8px;">';

// Détails de livraison
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Détails de livraison</h2>';
$messageHtml .= '<table style="width: 100%; margin-bottom: 20px;">';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Nom:</td><td>' . htmlspecialchars($fullName) . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Adresse:</td><td>' . htmlspecialchars($userDetails['address'] ?? '') . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Pays / Code postal:</td><td>' . htmlspecialchars($userDetails['country'] ?? '') . ' - ' . htmlspecialchars($userDetails['zip_code'] ?? '') . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Téléphone:</td><td>' . htmlspecialchars($userDetails['phone'] ?? '') . '</td></tr>';
$messageHtml .= '<tr><td style="padding: 8px; font-weight: bold;">Note de commande:</td><td>' . htmlspecialchars($userDetails['orderNote'] ?? '') . '</td></tr>'; // Nouvelle ligne pour la note de commande
$messageHtml .= '</table>';

// Articles commandés
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Articles commandés</h2>';
$messageHtml .= '<table style="width: 100%; border-collapse: collapse;">';
$messageHtml .= '<thead><tr style="background-color: ' . $mainColor . '; color: ' . $secondaryColor . ';"><th>Article</th><th>Qté</th><th>Prix</th><th>Personnalisation</th><th>Pack</th><th>Boîte</th></tr></thead>';
$messageHtml .= '<tbody>';

foreach ($items as $item) {
    $messageHtml .= '<tr>';
    $messageHtml .= '<td>' . htmlspecialchars($item['name'] ?? '') . ' (' . htmlspecialchars($item['size'] ?? '') . ', ' . htmlspecialchars($item['color'] ?? '') . ')</td>';
    $messageHtml .= '<td>' . htmlspecialchars($item['quantity'] ?? 0) . '</td>';
    $messageHtml .= '<td>' . htmlspecialchars($item['total_price'] ?? 0) . ' TND</td>';
    $messageHtml .= '<td>' . htmlspecialchars($item['personalization'] ?? '-') . '</td>';
    $messageHtml .= '<td>' . htmlspecialchars($item['pack'] ?? '-') . '</td>';
    $messageHtml .= '<td>' . htmlspecialchars($item['box'] ?? '-') . '</td>';
    $messageHtml .= '</tr>';
}

$messageHtml .= '</tbody></table>';

// Détails des prix
$messageHtml .= '<h2 style="color: ' . $mainColor . ';">Détails des prix</h2>';
$messageHtml .= '<table style="width: 100%;">';
$messageHtml .= '<tr><td>Sous-total:</td><td>' . htmlspecialchars($priceDetails['subtotal'] ?? '0') . ' TND</td></tr>';
$messageHtml .= '<tr><td>Frais de livraison:</td><td>' . htmlspecialchars($priceDetails['shipping_cost'] ?? '0') . ' TND</td></tr>';
$messageHtml .= '<tr><td>Remise newsletter:</td><td>' . htmlspecialchars($priceDetails['newsletter_discount_amount'] ?? '0') . ' TND</td></tr>';
$messageHtml .= '<tr><td>Total:</td><td><strong>' . htmlspecialchars($priceDetails['final_total'] ?? '0') . ' TND</strong></td></tr>';
$messageHtml .= '</table>';

$messageHtml .= '<div style="background-color:' . $mainColor . '; padding: 20px; text-align: center; color: ' . $secondaryColor . '; font-size: 14px;">';
$messageHtml .= 'Pour toute question, contactez-nous à <a href="mailto:support@fioriforyou.com" style="color: ' . $secondaryColor . '; text-decoration: none;">support@fioriforyou.com</a>';
$messageHtml .= '</div>';

$messageHtml .= '</body></html>';

// Envoyer l'email
$headers = "From: no-reply@fioriforyou.com\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";

if (mail($emailTo, "Confirmation de commande - " . htmlspecialchars($orderId), $messageHtml, $headers)) {
    echo json_encode(["succès" => true, "message" => "Email envoyé avec succès."]);
} else {
    http_response_code(500);
    echo json_encode(["erreur" => "Échec de l'envoi de l'email."]);
}
?>