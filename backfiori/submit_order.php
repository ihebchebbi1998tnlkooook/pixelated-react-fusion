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
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
$conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Capture POST data
    $productsBought = $_POST['products_bought'] ?? 'No products';
    $quantity = $_POST['quantity'] ?? '0';
    $total = $_POST['total'] ?? '0.00';
    $status = $_POST['status'] ?? 'Unpaid';
    $comments = $_POST['comments'] ?? 'No comments';
    $firstName = $_POST['first_name'] ?? 'Anonymous';
    $lastName = $_POST['last_name'] ?? 'User';
    $email = $_POST['email'] ?? 'no-email@example.com';
    $phoneNumber = $_POST['phone_number'] ?? '0000000000';
    $address = $_POST['address'] ?? 'No address';
    $zipCode = $_POST['zip_code'] ?? '00000';
    $country = $_POST['country'] ?? 'Unknown';
    $paymentMethod = $_POST['payment_method'] ?? 'Unspecified';

    // Insert into table
    $sql = "INSERT INTO Orders (
        ProductsBought, Quantity, Total, Status, Comments, 
        FirstName, LastName, Email, PhoneNumber, Address, 
        ZipCode, Country, PaymentMethod, DateOfCreation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("sssssssssssss",
        $productsBought, $quantity, $total, $status, $comments, 
        $firstName, $lastName, $email, $phoneNumber, $address, 
        $zipCode, $country, $paymentMethod
    );

    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    $insertedId = $conn->insert_id;

    $stmt->close();
    $conn->close();

    $responseData = array(
        'order_id' => $insertedId,
        'products_bought' => $productsBought,
        'quantity' => $quantity,
        'total' => $total,
        'status' => $status,
        'comments' => $comments,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'phone_number' => $phoneNumber,
        'address' => $address,
        'zip_code' => $zipCode,
        'country' => $country,
        'payment_method' => $paymentMethod,
        'date_of_creation' => date('Y-m-d H:i:s')
    );

    sendJsonResponse("success", "Order added successfully", $responseData);

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}
?>
