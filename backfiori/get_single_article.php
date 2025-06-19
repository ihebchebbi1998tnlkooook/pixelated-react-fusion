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

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if the `id_product` parameter is provided
    if (isset($_GET['id_product'])) {
        $id_product = $_GET['id_product'];

        // Prepare the SQL statement to select the product details
        $stmt = $conn->prepare("SELECT id_product, reference_product, nom_product, img_product, description_product, type_product, category_product, price_product, qnty_product, status_product, createdate_product FROM product WHERE id_product = ?");
        $stmt->bind_param("i", $id_product);

        // Execute the statement
        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                echo json_encode(["status" => "success", "data" => $product]);
            } else {
                echo json_encode(["status" => "error", "message" => "Product not found."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Error executing query: " . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Missing `id_product` parameter."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET to retrieve data."]);
}

// Close the database connection
$conn->close();
?>
