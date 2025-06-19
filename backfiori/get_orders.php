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
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Orders";
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    $conn->close();

    sendJsonResponse("success", "Orders retrieved successfully", $orders);

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
