<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database credentials
$servername = "fioriflmaster.mysql.db";
$username = "fioriflmaster";
$password = "Azerty123456";
$dbname = "fioriflmaster";

// Establish database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data['id_product'])) {
    echo json_encode(["status" => "error", "message" => "Product ID is required"]);
    exit;
}

// Extract product ID
$id_product = intval($data['id_product']);

// Query to fetch current stock
$query = "SELECT xs_size, s_size, m_size, l_size, xl_size, xxl_size FROM products WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id_product);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Product not found"]);
    exit;
}

$product = $result->fetch_assoc();

// Prepare dynamic update query
$update_fields = [];
$update_values = [];

if (isset($data['xs_size'])) {
    $update_fields[] = "xs_size = ?";
    $update_values[] = max(0, $product['xs_size'] - intval($data['xs_size']));
}
if (isset($data['s_size'])) {
    $update_fields[] = "s_size = ?";
    $update_values[] = max(0, $product['s_size'] - intval($data['s_size']));
}
if (isset($data['m_size'])) {
    $update_fields[] = "m_size = ?";
    $update_values[] = max(0, $product['m_size'] - intval($data['m_size']));
}
if (isset($data['l_size'])) {
    $update_fields[] = "l_size = ?";
    $update_values[] = max(0, $product['l_size'] - intval($data['l_size']));
}
if (isset($data['xl_size'])) {
    $update_fields[] = "xl_size = ?";
    $update_values[] = max(0, $product['xl_size'] - intval($data['xl_size']));
}
if (isset($data['xxl_size'])) {
    $update_fields[] = "xxl_size = ?";
    $update_values[] = max(0, $product['xxl_size'] - intval($data['xxl_size']));
}

// If no size fields provided, return an error
if (empty($update_fields)) {
    echo json_encode(["status" => "error", "message" => "No size fields provided to update"]);
    exit;
}

// Add product ID to values for WHERE clause
$update_values[] = $id_product;

// Build and execute the update query
$update_query = "UPDATE products SET " . implode(", ", $update_fields) . " WHERE id = ?";
$update_stmt = $conn->prepare($update_query);
$update_stmt->bind_param(str_repeat("i", count($update_values)), ...$update_values);

if ($update_stmt->execute()) {
    // Fetch the updated stock
    $updated_query = "SELECT xs_size, s_size, m_size, l_size, xl_size, xxl_size FROM products WHERE id = ?";
    $updated_stmt = $conn->prepare($updated_query);
    $updated_stmt->bind_param("i", $id_product);
    $updated_stmt->execute();
    $updated_result = $updated_stmt->get_result();
    $updated_stock = $updated_result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "message" => "Stock updated successfully",
        "updated_stock" => $updated_stock
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update stock"]);
}

// Close connections
$stmt->close();
$update_stmt->close();
$conn->close();
?>
