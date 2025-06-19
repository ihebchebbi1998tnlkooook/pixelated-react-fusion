<?php

ini_set('display_errors', 0);
error_reporting(E_ALL);

function sendJsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
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
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Only POST is allowed.');
    }

    // Use $_POST directly for FormData
    if (!isset($_POST['id_product']) || empty($_POST['id_product'])) {
        throw new Exception('Product ID is required');
    }

    $id_product = intval($_POST['id_product']);
    $allowedFields = [
        'nom_product' => 's',
        'price_product' => 's',
        'qnty_product' => 's',
        'status_product' => 's',
        'description_product' => 's',
        'type_product' => 's',
        'category_product' => 's',
        'reference_product' => 's'
    ];

    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $updateFields = [];
    $types = "";
    $values = [];

    foreach ($allowedFields as $field => $type) {
        if (isset($_POST[$field])) {
            $updateFields[] = "$field = ?";
            $types .= $type;
            $values[] = $_POST[$field];
        }
    }

    // Handle image upload if provided
    if (isset($_FILES['img_product']) && $_FILES['img_product']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['img_product'];
        $upload_dir = 'productsimages/';
        $extension = pathinfo($image['name'], PATHINFO_EXTENSION);
        $new_filename = 'product_' . uniqid() . '.' . $extension;
        $target_path = $upload_dir . $new_filename;

        if (!move_uploaded_file($image['tmp_name'], $target_path)) {
            throw new Exception('Failed to upload image');
        }
        $updateFields[] = "img_product = ?";
        $types .= "s";
        $values[] = $target_path;
    }

    if (empty($updateFields)) {
        throw new Exception('No fields to update');
    }

    // Add id_product
    $types .= "i";
    $values[] = $id_product;

    $sql = "UPDATE product SET " . implode(", ", $updateFields) . " WHERE id_product = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param($types, ...$values);

    if (!$stmt->execute()) {
        throw new Exception("Failed to update product: " . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        throw new Exception("No changes made or product not found");
    }

    $stmt->close();
    $conn->close();

    sendJsonResponse("success", "Product updated successfully", array("id" => $id_product));

} catch (Exception $e) {
    error_log("Modify Product Error: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}

?>
