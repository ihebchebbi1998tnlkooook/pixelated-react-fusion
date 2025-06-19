<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

    // Query to fetch all emails
    $sql = "SELECT id, email FROM NewsletterSubscribers";
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $emails = array();
    while ($row = $result->fetch_assoc()) {
        $emails[] = $row;
    }

    $conn->close();

    // Send success response with data
    sendJsonResponse("success", "Emails retrieved successfully", $emails);

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
