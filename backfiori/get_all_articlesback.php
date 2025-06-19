<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, expires");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Exit for preflight requests
}

// Define database configuration
$config = [
    'servername' => "fioriflmaster.mysql.db",
    'username' => "fioriflmaster",
    'password' => "Azerty123456",
    'dbname' => "fioriflmaster"
];

try {
    // Create database connection
    $conn = new mysqli(
        $config['servername'],
        $config['username'],
        $config['password'],
        $config['dbname']
    );

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Set the character set
    $conn->set_charset("utf8mb4");

    // Initialize query
    $sql = "SELECT
                id_product,
                reference_product,
                nom_product,
                img_product,
                img2_product,
                img3_product,
                img4_product,
                description_product,
                type_product,
                category_product,
                itemgroup_product,
                price_product,
                status_product,
                discount_product,
                related_products,
                color_product,
                createdate_product,
                3xl_size,
                s_size,
                m_size,
                l_size,
                xl_size,
                xxl_size,
                `48_size`,
                `50_size`,
                `52_size`,
                `54_size`,
                `56_size`,
                `58_size`,
               CASE
                    WHEN itemgroup_product IN ('costumes', 'vestes') THEN
                        (`48_size` + `50_size` + `52_size` + `54_size` + `56_size` + `58_size`)
                    WHEN itemgroup_product IN ('cravates', 'sacs-a-main', 'portefeuilles', 'porte-cles' ,'porte-passport','porte-cartes') THEN
                        qnty_product
                    ELSE
                        (`3xl_size` +`4xl_size` + s_size  + xs_size + m_size + l_size + xl_size + xxl_size)
                END AS qnty_product
            FROM product";

    // Execute query
    $result = $conn->query($sql);

    if ($result === false) {
        throw new Exception("Query failed: " . $conn->error . " | SQL: " . $sql);
    }

    // Prepare response
    if ($result->num_rows > 0) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            array_walk_recursive($row, function (&$item) {
                $item = is_null($item) ? '' : htmlspecialchars_decode(htmlspecialchars($item, ENT_QUOTES, 'UTF-8'), ENT_QUOTES);
            });
            $products[] = $row;
        }
        $response = [
            "status" => "success",
            "count" => count($products),
            "products" => $products
        ];
    } else {
        $response = [
            "status" => "success",
            "count" => 0,
            "products" => []
        ];
    }

    // Encode response as JSON
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    // Handle exceptions
    $response = [
        "status" => "error",
        "message" => $e->getMessage()
    ];
    
    http_response_code(500);
    echo json_encode($response, JSON_PRETTY_PRINT);
} finally {
    // Closing connection
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>
