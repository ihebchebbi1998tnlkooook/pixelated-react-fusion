<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$config = [
    'servername' => "fioriflmaster.mysql.db",
    'username' => "fioriflmaster",
    'password' => "Azerty123456",
    'dbname' => "fioriflmaster"
];

try {
    $conn = new mysqli(
        $config['servername'],
        $config['username'], 
        $config['password'],
        $config['dbname']
    );

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    // Retrieve the product ID from the query string
    $id_product = isset($_GET['id_product']) ? intval($_GET['id_product']) : 0;

    if ($id_product <= 0) {
        throw new Exception("Invalid product ID.");
    }

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
                4xl_size,
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
                    WHEN itemgroup_product IN ('cravates', 'portefeuilles', 'porte-cles') THEN
                        qnty_product
                    ELSE
                        (`3xl_size` +`4xl_size` + s_size  + xs_size + m_size + l_size + xl_size + xxl_size)
                END AS qnty_product
            FROM product
            WHERE id_product = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Query preparation failed: " . $conn->error);
    }

    $stmt->bind_param("i", $id_product);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        array_walk_recursive($product, function (&$item) {
            $item = is_null($item) ? '' : htmlspecialchars_decode(htmlspecialchars($item, ENT_QUOTES, 'UTF-8'), ENT_QUOTES);
        });

        $response = [
            "status" => "success",
            "product" => $product
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "Product not found."
        ];
    }

    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    $response = [
        "status" => "error",
        "message" => $e->getMessage()
    ];
    
    http_response_code(500);
    echo json_encode($response, JSON_PRETTY_PRINT);

} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>
