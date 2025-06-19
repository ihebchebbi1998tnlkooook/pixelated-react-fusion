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
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Set default values
    $values = array(
        'reference_product' => isset($_POST['reference_product']) ? $_POST['reference_product'] : 'REF_' . uniqid(),
        'nom_product' => isset($_POST['nom_product']) ? $_POST['nom_product'] : 'Unnamed Product',
        'description_product' => isset($_POST['description_product']) ? $_POST['description_product'] : 'No description',
        'type_product' => isset($_POST['type_product']) ? $_POST['type_product'] : 'Unspecified',
        'category_product' => isset($_POST['category_product']) ? $_POST['category_product'] : 'Uncategorized',
        'itemgroup_product' => isset($_POST['itemgroup_product']) ? $_POST['itemgroup_product'] : '',
        'price_product' => isset($_POST['price_product']) ? $_POST['price_product'] : '0.00',
        'qnty_product' => isset($_POST['qnty_product']) ? $_POST['qnty_product'] : '0',
        '3xl_size' => isset($_POST['3xl_size']) ? $_POST['3xl_size'] : '',
        's_size' => isset($_POST['s_size']) ? $_POST['s_size'] : '',
        'm_size' => isset($_POST['m_size']) ? $_POST['m_size'] : '',
        'l_size' => isset($_POST['l_size']) ? $_POST['l_size'] : '',
        'xl_size' => isset($_POST['xl_size']) ? $_POST['xl_size'] : '',
        'xxl_size' => isset($_POST['xxl_size']) ? $_POST['xxl_size'] : '',
        'color_product' => isset($_POST['color_product']) ? $_POST['color_product'] : '',
        'status_product' => isset($_POST['status_product']) ? $_POST['status_product'] : 'Out of Stock',
        'related_products' => isset($_POST['related_products']) ? $_POST['related_products'] : ''
    );

    // Handle multiple image uploads
    $image_paths = array(
        'img_product' => 'productsimages/default_product.png',
        'img2_product' => '',
        'img3_product' => '',
        'img4_product' => ''
    );

    // Process each image upload
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
            } else {
                throw new Exception("Failed to upload image: " . $field);
            }
        }
    }

    // Modified SQL query
    $sql = "INSERT INTO product (
        reference_product, nom_product, img_product, img2_product, img3_product, img4_product,
        description_product, type_product, category_product, itemgroup_product, price_product,
        qnty_product, 3xl_size, s_size, m_size, l_size, xl_size, xxl_size,
        color_product, status_product, related_products, createdate_product
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("ssssssssssssssssssssss",
        $values['reference_product'],
        $values['nom_product'],
        $image_paths['img_product'],
        $image_paths['img2_product'],
        $image_paths['img3_product'],
        $image_paths['img4_product'],
        $values['description_product'],
        $values['type_product'],
        $values['category_product'],
        $values['itemgroup_product'],
        $values['price_product'],
        $values['qnty_product'],
        $values['3xl_size'],
        $values['s_size'],
        $values['m_size'],
        $values['l_size'],
        $values['xl_size'],
        $values['xxl_size'],
        $values['color_product'],
        $values['status_product'],
        $values['related_products']
    );

    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    // Get the auto-generated ID
    $inserted_id = $conn->insert_id;

    $stmt->close();
    $conn->close();

    // Add the ID to the response data
    $response_data = array(
        'id' => $inserted_id,
        'reference_product' => $values['reference_product'],
        'nom_product' => $values['nom_product'],
        'img_product' => $image_paths['img_product'],
        'img2_product' => $image_paths['img2_product'],
        'img3_product' => $image_paths['img3_product'],
        'img4_product' => $image_paths['img4_product'],
        'description_product' => $values['description_product'],
        'type_product' => $values['type_product'],
        'category_product' => $values['category_product'],
        'itemgroup_product' => $values['itemgroup_product'],
        'price_product' => $values['price_product'],
        'qnty_product' => $values['qnty_product'],
        '3xl_size' => $values['3xl_size'],
        's_size' => $values['s_size'],
        'm_size' => $values['m_size'],
        'l_size' => $values['l_size'],
        'xl_size' => $values['xl_size'],
        'xxl_size' => $values['xxl_size'],
        'color_product' => $values['color_product'],
        'status_product' => $values['status_product'],
        'related_products' => $values['related_products'],
        'createdate_product' => date('Y-m-d H:i:s')
    );

    sendJsonResponse("success", "Product added successfully", $response_data);

} catch (Exception $e) {
    error_log("Error in add_article.php: " . $e->getMessage());
    sendJsonResponse("error", $e->getMessage());
}
?>
