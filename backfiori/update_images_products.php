<?php
ini_set('display_errors', 1);
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
header("Access-Control-Allow-Methods: POST, DELETE, PUT, OPTIONS");
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

    // Handle DELETE request
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $data = json_decode(file_get_contents("php://input"), true);
        $product_id = isset($data['id_product']) ? $data['id_product'] : null;
        $image_number = isset($data['image_number']) ? $data['image_number'] : null;

        if (!$product_id || !$image_number) {
            sendJsonResponse("error", "Missing product ID or image number");
        }

        $image_field = "img" . ($image_number > 1 ? $image_number : "") . "_product";
        
        $sql = "UPDATE product SET $image_field = NULL WHERE id_product = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $product_id);
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to delete image: " . $stmt->error);
        }
        
        $stmt->close();
        $conn->close();
        sendJsonResponse("success", "Image deleted successfully");
    }

    // Handle PUT/UPDATE request
    if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'POST') {
        $product_id = isset($_POST['id_product']) ? $_POST['id_product'] : null;
        
        if (!$product_id) {
            sendJsonResponse("error", "Missing product ID");
        }

        $image_paths = array();
        $update_fields = array();
        $types = "";
        $params = array();

        // Handle image uploads
        $image_fields = array('img_product', 'img2_product', 'img3_product', 'img4_product');
        foreach ($image_fields as $field) {
            if (isset($_FILES[$field]) && $_FILES[$field]['error'] === UPLOAD_ERR_OK) {
                $upload_dir = 'productsimages/';
                if (!file_exists($upload_dir)) {
                    mkdir($upload_dir, 0777, true);
                }

                $extension = pathinfo($_FILES[$field]['name'], PATHINFO_EXTENSION);
                $new_filename = 'product_' . uniqid() . '.' . $extension;
                $target_path = $upload_dir . $new_filename;

                if (move_uploaded_file($_FILES[$field]['tmp_name'], $target_path)) {
                    $image_paths[$field] = $target_path;
                    $update_fields[] = "$field = ?";
                    $types .= "s";
                    $params[] = $target_path;
                }
            }
        }

        if (empty($update_fields)) {
            sendJsonResponse("error", "No images provided for update");
        }

        // Add product_id to params array
        $types .= "i";
        $params[] = $product_id;

        // Create dynamic SQL query
        $sql = "UPDATE product SET " . implode(", ", $update_fields) . " WHERE id_product = ?";
        
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new Exception("Prepare statement failed: " . $conn->error);
        }

        // Bind parameters dynamically
        $bind_params = array($types);
        foreach ($params as $key => $value) {
            $bind_params[] = &$params[$key];
        }
        call_user_func_array(array($stmt, 'bind_param'), $bind_params);

        if (!$stmt->execute()) {
            throw new Exception("Execute statement failed: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
        sendJsonResponse("success", "Images updated successfully", $image_paths);
    }

} catch (Exception $e) {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
    error_log("Error in manage_product_images.php: " . $e->getMessage());
    sendJsonResponse("error", "An error occurred: " . $e->getMessage());
}
?>
