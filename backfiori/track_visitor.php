<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$servername = "fioriflmaster.mysql.db";
$username = "fioriflmaster";
$password = "Azerty123456";
$dbname = "fioriflmaster";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Get raw input
$raw_data = file_get_contents("php://input");
$input_data = json_decode($raw_data, true);

// Validate the request
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || $input_data === null) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

// Validate required fields
if (!isset($input_data['page_visitors'])) {
    echo json_encode(["status" => "error", "message" => "Missing page_visitors parameter"]);
    exit;
}

// Get visitor's IP
$ip_visitors = $_SERVER['REMOTE_ADDR'];
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip_visitors = $_SERVER['HTTP_X_FORWARDED_FOR'];
}

// Get geolocation data
try {
    $geo_data = json_decode(file_get_contents("http://ip-api.com/json/{$ip_visitors}"), true);
    $city_visitors = $geo_data['city'] ?? "Unknown";
    $country_visitors = $geo_data['country'] ?? "Unknown";
} catch (Exception $e) {
    $city_visitors = "Unknown";
    $country_visitors = "Unknown";
}

// Data fields
$page_visitors = $input_data['page_visitors'];
$date_visitors = date('Y-m-d H:i:s'); // Current timestamp

// Check for existing entries in the last hour
$check_query = $conn->prepare("SELECT id FROM visitors 
    WHERE ip_visitors = ? 
    AND page_visitors = ? 
    AND date_visitors >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    LIMIT 1");

$check_query->bind_param("ss", $ip_visitors, $page_visitors);
$check_query->execute();
$result = $check_query->get_result();

if ($result->num_rows > 0) {
    // Entry exists within the last hour
    echo json_encode([
        "status" => "info",
        "message" => "Entry already exists within the last hour",
        "data" => [
            "ip" => $ip_visitors,
            "city" => $city_visitors,
            "country" => $country_visitors,
            "page" => $page_visitors,
            "date" => $date_visitors
        ]
    ]);
    
    $check_query->close();
    $conn->close();
    exit;
}
$check_query->close();

// If no recent entry exists, proceed with insert
$stmt = $conn->prepare("INSERT INTO visitors (page_visitors, city_visitors, country_visitors, ip_visitors, date_visitors) 
    VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $page_visitors, $city_visitors, $country_visitors, $ip_visitors, $date_visitors);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Visitor data inserted successfully",
        "data" => [
            "ip" => $ip_visitors,
            "city" => $city_visitors,
            "country" => $country_visitors,
            "page" => $page_visitors,
            "date" => $date_visitors
        ]
    ]);
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Error inserting data: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>