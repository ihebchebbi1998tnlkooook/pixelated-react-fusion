<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

function sendJsonResponse($status, $message, $data = null) {
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

try {
    $conn = new mysqli("fioriflmaster.mysql.db", "fioriflmaster", "Azerty123456", "fioriflmaster");
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $values = array(
        'reference_product' => isset($_POST['reference_product']) && $_POST['reference_product'] ? $_POST['reference_product'] : null,
        'nom_product' => isset($_POST['nom_product']) && $_POST['nom_product'] ? $_POST['nom_product'] : null,
        'description_product' => isset($_POST['description_product']) && $_POST['description_product'] ? $_POST['description_product'] : null,
        'type_product' => isset($_POST['type_product']) && $_POST['type_product'] ? $_POST['type_product'] : null,
        'category_product' => isset($_POST['category_product']) && $_POST['category_product'] ? $_POST['category_product'] : null,
        'itemgroup_product' => isset($_POST['itemgroup_product']) && $_POST['itemgroup_product'] ? $_POST['itemgroup_product'] : null,
        'price_product' => isset($_POST['price_product']) && $_POST['price_product'] ? $_POST['price_product'] : null,
        'qnty_product' => isset($_POST['qnty_product']) && $_POST['qnty_product'] ? $_POST['qnty_product'] : null,
        'color_product' => isset($_POST['color_product']) && $_POST['color_product'] ? $_POST['color_product'] : null,
        'status_product' => isset($_POST['status_product']) && $_POST['status_product'] ? $_POST['status_product'] : null,
        'related_products' => isset($_POST['related_products']) && $_POST['related_products'] ? $_POST['related_products'] : null,
        'discount_product' => isset($_POST['discount_product']) && $_POST['discount_product'] ? $_POST['discount_product'] : null
    );

    // Handle sizes for costumes and non-costumes
    if ($values['itemgroup_product'] === 'costumes') {
        $values['48_size'] = isset($_POST['48_size']) && $_POST['48_size'] ? $_POST['48_size'] : null;
        $values['50_size'] = isset($_POST['50_size']) && $_POST['50_size'] ? $_POST['50_size'] : null;
        $values['52_size'] = isset($_POST['52_size']) && $_POST['52_size'] ? $_POST['52_size'] : null;
        $values['54_size'] = isset($_POST['54_size']) && $_POST['54_size'] ? $_POST['54_size'] : null;
        $values['56_size'] = isset($_POST['56_size']) && $_POST['56_size'] ? $_POST['56_size'] : null;
        $values['58_size'] = isset($_POST['58_size']) && $_POST['58_size'] ? $_POST['58_size'] : null;
        $values['s_size'] = null;
        $values['m_size'] = null;
        $values['l_size'] = null;
        $values['xl_size'] = null;
        $values['xxl_size'] = null;
        $values['3xl_size'] = null;
    } else {
        $values['s_size'] = isset($_POST['s_size']) && $_POST['s_size'] ? $_POST['s_size'] : null;
        $values['m_size'] = isset($_POST['m_size']) && $_POST['m_size'] ? $_POST['m_size'] : null;
        $values['l_size'] = isset($_POST['l_size']) && $_POST['l_size'] ? $_POST['l_size'] : null;
        $values['xl_size'] = isset($_POST['xl_size']) && $_POST['xl_size'] ? $_POST['xl_size'] : null;
        $values['xxl_size'] = isset($_POST['xxl_size']) && $_POST['xxl_size'] ? $_POST['xxl_size'] : null;
        $values['3xl_size'] = isset($_POST['3xl_size']) && $_POST['3xl_size'] ? $_POST['3xl_size'] : null;
        $values['48_size'] = null;
        $values['50_size'] = null;
        $values['52_size'] = null;
        $values['54_size'] = null;
        $values['56_size'] = null;
        $values['58_size'] = null;
    }

    $image_paths = array(
        'img_product' => 'productsimages/default_product.png',
        'img2_product' => null,
        'img3_product' => null,
        'img4_product' => null
    );

    // Handle file uploads for images
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

    // Prepare the SQL query with placeholders
    $sql = "INSERT INTO product (
        reference_product, nom_product, img_product, img2_product, img3_product, img4_product,
        description_product, type_product, category_product, itemgroup_product, price_product,
        qnty_product, s_size, m_size, l_size, xl_size, xxl_size, 3xl_size,
        48_size, 50_size, 52_size, 54_size, 56_size, 58_size,
        color_product, status_product, related_products, discount_product, createdate_product
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    // Bind the parameters to the prepared statement
    $stmt->bind_param("ssssssssssssssssssssssssssss",
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
        $values['s_size'],
        $values['m_size'],
        $values['l_size'],
        $values['xl_size'],
        $values['xxl_size'],
        $values['3xl_size'],
        $values['48_size'],
        $values['50_size'],
        $values['52_size'],
        $values['54_size'],
        $values['56_size'],
        $values['58_size'],
        $values['color_product'],
        $values['status_product'],
        $values['related_products'],
        $values['discount_product']
    );

    if (!$stmt->execute()) {
        throw new Exception("Execute statement failed: " . $stmt->error);
    }

    $inserted_id = $conn->insert_id;
    $stmt->close();
    $conn->close();

    // Return the successful response
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
        'color_product' => $values['color_product'],
        'status_product' => $values['status_product'],
        'related_products' => $values['related_products'],
        'discount_product' => $values['discount_product']
    );

    sendJsonResponse('success', 'Product inserted successfully', $response_data);
} catch (Exception $e) {
    sendJsonResponse('error', $e->getMessage());
}
?>
