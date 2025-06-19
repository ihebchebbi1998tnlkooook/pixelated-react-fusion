<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

    $orderId = $_POST['order_id'] ?? null;

    if (!$orderId) {
        throw new Exception("Order ID is required for deletion.");
    }

    $sql = "DELETE FROM Orders WHERE OrderId = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("i", $orderId);

    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    sendJsonResponse("success", "Order deleted successfully");

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
