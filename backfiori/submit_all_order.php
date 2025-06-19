<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

define("DB_HOST", "fioriflmaster.mysql.db");
define("DB_USER", "fioriflmaster");
define("DB_PASS", "Azerty123456");
define("DB_NAME", "fioriflmaster");

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed."]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE || !$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit;
}

$sql = "INSERT INTO orders (
    order_id,
    created_at,
    first_name,
    last_name,
    email,
    phone,
    address,
    country,
    zip_code,
    order_note,
    items,
    subtotal,
    shipping_cost,
    has_newsletter_discount,
    newsletter_discount_amount,
    final_total,
    payment_method,
    payment_status,
    konnect_payment_url,
    payment_completed_at,
    status,
    shipped_at,
    delivered_at,
    updated_at
) VALUES (
    ?, 
    CURRENT_TIMESTAMP, 
    ?, ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?, ?, ?, ?, 
    ?, ?, ?, ?, 
    CURRENT_TIMESTAMP
)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to prepare statement"]);
    exit;
}

$order_id = $data["order_id"];
$first_name = $data["user_details"]["first_name"];
$last_name = $data["user_details"]["last_name"];
$email = $data["user_details"]["email"];
$phone = $data["user_details"]["phone"];
$address = $data["user_details"]["address"];
$country = $data["user_details"]["country"];
$zip_code = $data["user_details"]["zip_code"];
$order_note = $data["user_details"]["order_note"] ?? null;
$items = json_encode($data["items"]);
$subtotal = $data["price_details"]["subtotal"];
$shipping_cost = $data["price_details"]["shipping_cost"];
$has_newsletter_discount = $data["price_details"]["has_newsletter_discount"] ?? 0;
$newsletter_discount_amount = $data["price_details"]["newsletter_discount_amount"] ?? 0;
$final_total = $data["price_details"]["final_total"];
$payment_method = $data["payment"]["method"];
$payment_status = $data["payment"]["status"] ?? 'pending';
$konnect_payment_url = $data["payment"]["konnect_payment_url"] ?? null;
$payment_completed_at = $data["payment"]["completed_at"];
$status = $data["order_status"]["status"] ?? 'pending';
$shipped_at = $data["order_status"]["shipped_at"] ?? null;
$delivered_at = $data["order_status"]["delivered_at"] ?? null;

$stmt->bind_param(
    "ssssssssssdiddssssssss",  // 23 parameters
    $order_id,
    $first_name,
    $last_name,
    $email,
    $phone,
    $address,
    $country,
    $zip_code,
    $order_note,
    $items,
    $subtotal,
    $shipping_cost,
    $has_newsletter_discount,
    $newsletter_discount_amount,
    $final_total,
    $payment_method,
    $payment_status,
    $konnect_payment_url,
    $payment_completed_at,
    $status,
    $shipped_at,
    $delivered_at
);


if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Order created successfully", "order_id" => $order_id]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to create order: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
