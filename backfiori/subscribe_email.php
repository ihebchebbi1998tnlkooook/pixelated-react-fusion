<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Database connection
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Get the email from the request
    $input = json_decode(file_get_contents("php://input"), true);
    $email = isset($input['email']) ? $input['email'] : null;

    if (!$email) {
        throw new Exception("Email is required.");
    }

    // Insert the email into the table
    $stmt = $conn->prepare("INSERT INTO NewsletterSubscribers (email) VALUES (?)");
    $stmt->bind_param("s", $email);

    if (!$stmt->execute()) {
        throw new Exception("Failed to add email: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    // Send success response
    sendJsonResponse("success", "Email added successfully");

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}

function sendJsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = array(
        "status" => $status,
        "message" => $message,
        "data" => $data
    );
    echo json_encode($response);
    exit();
}
?>
