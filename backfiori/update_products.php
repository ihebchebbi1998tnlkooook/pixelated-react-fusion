<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Function to send JSON response
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

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Check if the content type is JSON
    if (!isset($_SERVER['CONTENT_TYPE']) || $_SERVER['CONTENT_TYPE'] !== 'application/json') {
        throw new Exception("Invalid content type. Only JSON is accepted.");
    }

    // Get the raw POST data
    $input_data = file_get_contents('php://input');
    $data = json_decode($input_data, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON format.");
    }

    // Database connection
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Validate required input
    if (empty($data['id_product']) || $data['id_product'] <= 0) {
        throw new Exception("Product ID is required for updating.");
    }
    $id_product = intval($data['id_product']);

    // Check if the product exists
    $check_sql = "SELECT id_product FROM product WHERE id_product = ?";
    $check_stmt = $conn->prepare($check_sql);
    if (!$check_stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }
    $check_stmt->bind_param("i", $id_product);
    $check_stmt->execute();
    $check_stmt->store_result();
    if ($check_stmt->num_rows === 0) {
        throw new Exception("No product found with the given ID.");
    }
    $check_stmt->close();

    // Define fields for update
    $fields = [
        'reference_product', 'nom_product', 'description_product', 'type_product',
        'category_product', 'itemgroup_product', 'price_product', 'qnty_product',
        '3xl_size', 'xs_size', '4xl_size', 's_size', 'm_size', 'l_size', 'xl_size', 'xxl_size', '48_size',
        '50_size', '52_size', '54_size', '56_size', '58_size', 'discount_product',
        'color_product', 'status_product', 'related_products'
    ];

    $update_fields = [];
    $params = [];
    $types = "";

    foreach ($fields as $field) {
        if (isset($data[$field])) {
            $update_fields[] = "$field = ?";
            $params[] = $data[$field];
            $types .= "s";
        }
    }

    if (empty($update_fields)) {
        throw new Exception("No fields to update.");
    }

    $params[] = $id_product;
    $types .= "i";

    $sql = "UPDATE product SET " . implode(", ", $update_fields) . " WHERE id_product = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param($types, ...$params);

    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }
    $stmt->close();

    $fetch_sql = "SELECT * FROM product WHERE id_product = ?";
    $fetch_stmt = $conn->prepare($fetch_sql);

    if (!$fetch_stmt) {
        throw new Exception("Prepare statement for fetching updated product failed: " . $conn->error);
    }

    $fetch_stmt->bind_param("i", $id_product);

    if (!$fetch_stmt->execute()) {
        throw new Exception("Execute statement for fetching updated product failed: " . $fetch_stmt->error);
    }

    $result = $fetch_stmt->get_result();
    $updated_product = $result->fetch_assoc();

    if (!$updated_product) {
        throw new Exception("Failed to fetch updated product details.");
    }

    $fetch_stmt->close();
    $conn->close();

    sendJsonResponse("success", "Product updated successfully", $updated_product);

} catch (Exception $e) {
    error_log("Error in update_product.php: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}
?>
