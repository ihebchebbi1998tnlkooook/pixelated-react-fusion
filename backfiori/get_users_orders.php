<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

// SQL query to fetch data
$sql = "SELECT * FROM orders";
$result = $conn->query($sql);

// Initialize response array
$response = [
    "success" => true,
    "data" => [],
    "message" => "Data retrieved successfully"
];

if ($result && $result->num_rows > 0) {
    // Fetch rows and format data
    while ($row = $result->fetch_assoc()) {
        $response['data'][] = [
            "id" => (int) $row["id"],
            "order_id" => $row["order_id"],
            "created_at" => $row["created_at"],
            "user_details" => [
                "first_name" => $row["first_name"],
                "last_name" => $row["last_name"],
                "email" => $row["email"],
                "phone" => $row["phone"],
                "address" => $row["address"],
                "country" => $row["country"],
                "zip_code" => $row["zip_code"], 
                "order_note" => $row["order_note"] 
            ],
            "items" => json_decode($row["items"]),
            "price_details" => [
                "subtotal" => (float) $row["subtotal"],
                "shipping_cost" => (float) $row["shipping_cost"],
                "has_newsletter_discount" => (bool) $row["has_newsletter_discount"],
                "newsletter_discount_amount" => (float) $row["newsletter_discount_amount"],
                "final_total" => (float) $row["final_total"]
            ],
            "payment" => [
                "method" => $row["payment_method"],
                "status" => $row["payment_status"],
                "konnect_payment_url" => $row["konnect_payment_url"],
                "completed_at" => $row["payment_completed_at"]
            ],
            "order_status" => [
                "status" => $row["status"],
                "shipped_at" => $row["shipped_at"],
                "delivered_at" => $row["delivered_at"]
            ],
            "updated_at" => $row["updated_at"]
        ];
    }
} else {
    $response['message'] = "No data found.";
}

// Close connection
$conn->close();

// Output response in JSON
echo json_encode($response, JSON_PRETTY_PRINT);
?>
