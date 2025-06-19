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
$conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Get input data
    $input = json_decode(file_get_contents("php://input"), true);
    $subject = isset($input['subject']) ? $input['subject'] : null;
    $message = isset($input['message']) ? $input['message'] : null;

    if (!$subject || !$message) {
        throw new Exception("Subject and message are required.");
    }

    // Insert review into the table
    $stmt = $conn->prepare("INSERT INTO Review (subject, message) VALUES (?, ?)");
    $stmt->bind_param("ss", $subject, $message);

    if (!$stmt->execute()) {
        throw new Exception("Failed to add review: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    sendJsonResponse("success", "Review added successfully");

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
