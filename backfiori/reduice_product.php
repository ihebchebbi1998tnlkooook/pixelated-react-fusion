<?php
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

// Validate input
if (!isset($data['id_product'])) {
    echo json_encode(["status" => "error", "message" => "Product ID is required"]);
    exit;
}

// Extract data
$id_product = $data['id_product'];
$xs_size = isset($data['xs_size']) ? intval($data['xs_size']) : 0;
$s_size = isset($data['s_size']) ? intval($data['s_size']) : 0;
$m_size = isset($data['m_size']) ? intval($data['m_size']) : 0;
$l_size = isset($data['l_size']) ? intval($data['l_size']) : 0;
$xl_size = isset($data['xl_size']) ? intval($data['xl_size']) : 0;
$xxl_size = isset($data['xxl_size']) ? intval($data['xxl_size']) : 0;

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

// Deduct the stock for each size
$new_xs = max(0, $product['xs_size'] - $xs_size);
$new_s = max(0, $product['s_size'] - $s_size);
$new_m = max(0, $product['m_size'] - $m_size);
$new_l = max(0, $product['l_size'] - $l_size);
$new_xl = max(0, $product['xl_size'] - $xl_size);
$new_xxl = max(0, $product['xxl_size'] - $xxl_size);

// Update stock in database
$update_query = "UPDATE products SET xs_size = ?, s_size = ?, m_size = ?, l_size = ?, xl_size = ?, xxl_size = ? WHERE id = ?";
$update_stmt = $conn->prepare($update_query);
$update_stmt->bind_param("iiiiiii", $new_xs, $new_s, $new_m, $new_l, $new_xl, $new_xxl, $id_product);

if ($update_stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Stock updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update stock"]);
}

// Close connections
$stmt->close();
$update_stmt->close();
$conn->close();
?>
