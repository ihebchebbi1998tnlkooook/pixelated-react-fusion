<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

function sendJsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    sendJsonResponse("success", "Preflight OK");
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        throw new Exception('Invalid request method. Only DELETE is allowed.');
    }

    $id_product = isset($_GET['id_product']) ? $_GET['id_product'] : null;

    if (!$id_product) {
        throw new Exception('Product ID is required');
    }

    if (!is_numeric($id_product)) {
        throw new Exception('Invalid product ID format');
    }

    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Changed 'id' to 'id_product' in the queries
    $stmt = $conn->prepare("SELECT img_product FROM product WHERE id_product = ?");
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("i", $id_product);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();
    $stmt->close();

    if (!$product) {
        throw new Exception("Product not found");
    }

    // Changed 'id' to 'id_product' here as well
    $stmt = $conn->prepare("DELETE FROM product WHERE id_product = ?");
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("i", $id_product);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to delete product: " . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        throw new Exception("Product not found or already deleted");
    }

    $imagePath = $product['img_product'];
    if ($imagePath && $imagePath !== 'productsimages/default_product.png' && file_exists($imagePath)) {
        unlink($imagePath);
    }

    $stmt->close();
    $conn->close();

    sendJsonResponse("success", "Product deleted successfully", array("id" => $id_product));

} catch (Exception $e) {
    error_log("Delete Product Error: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}
?>