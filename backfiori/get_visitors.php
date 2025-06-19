<?php
// Enable CORS for cross-region access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
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
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve all visitors
$sql = "SELECT * FROM visitors";
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Create an array to store the visitors
    $visitors = array();

    // Fetch all rows and add to the array
    while($row = $result->fetch_assoc()) {
        $visitors[] = $row;
    }

    // Return the visitors data as a JSON response
    echo json_encode(["status" => "success", "data" => $visitors]);
} else {
    // If no visitors were found
    echo json_encode(["status" => "error", "message" => "No visitors found."]);
}

// Close the database connection
$conn->close();
?>
