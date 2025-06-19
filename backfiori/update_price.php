<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

function sendJsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = array(
        "status" => $status,
        "message" => $message
    );
    if ($data !== null) {
        $response["data"] = $data;
    }
    echo json_encode($response);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Check if required parameters are present
    if (!isset($_POST['id_product']) || !isset($_POST['percentage']) || !isset($_POST['operation'])) {
        throw new Exception("Missing required parameters: id_product, percentage, and operation");
    }

    // Get and validate parameters
    $id_product = intval($_POST['id_product']);
    $percentage = floatval($_POST['percentage']);
    $operation = strtolower(trim($_POST['operation'])); // '+' for increase, '-' for decrease

    // Validate operation
    if (!in_array($operation, ['+', '-'])) {
        throw new Exception("Operation must be either '+' or '-'");
    }

    // Validate percentage (between 0 and 100)
    if ($percentage < 0 || $percentage > 100) {
        throw new Exception("Percentage must be between 0 and 100");
    }

    // Database connection
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Get current price
    $sql = "SELECT price_product FROM product WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("i", $id_product);
    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        throw new Exception("Product not found");
    }

    $row = $result->fetch_assoc();
    $current_price = floatval($row['price_product']);
    
    // Calculate price change
    $change_amount = $current_price * ($percentage / 100);
    
    // Apply operation
    if ($operation === '+') {
        $new_price = $current_price + $change_amount;
        $operation_text = "increase";
    } else {
        $new_price = $current_price - $change_amount;
        $operation_text = "decrease";
    }

    // Update price in database
    $update_sql = "UPDATE product SET price_product = ? WHERE id = ?";
    $update_stmt = $conn->prepare($update_sql);
    if (!$update_stmt) {
        throw new Exception("Prepare update statement failed: " . $conn->error);
    }

    $update_stmt->bind_param("di", $new_price, $id_product);
    if (!$update_stmt->execute()) {
        throw new Exception("Execute update statement failed: " . $update_stmt->error);
    }

    // Prepare response data
    $response_data = array(
        'id_product' => $id_product,
        'original_price' => $current_price,
        'operation' => $operation,
        'percentage' => $percentage,
        'change_amount' => $change_amount,
        'new_price' => $new_price
    );

    $stmt->close();
    $update_stmt->close();
    $conn->close();

    sendJsonResponse("success", "Price {$operation_text} applied successfully", $response_data);

} catch (Exception $e) {
    error_log("Error in modify_price.php: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}
?>
