<?php
// CLIENT SIDE - Order Submission Script

$url = "https://respizenmedical.com/fiori/submit_all_order.php";

$data = [
    "order_id" => "ORDER-9876543210",
    "first_name" => "Jane",
    "last_name" => "Smith",
    "email" => "jane.smith@example.com",
    "phone" => "9876543210",
    "address" => "456 Elm St",
    "country" => "Canada",
    "zip_code" => "A1B2C3",
    "items" => [
        [
            "id" => 2,
            "name" => "Another Product",
            "price" => 49.99,
            "quantity" => 1,
            "image" => "url/to/image2.jpg",
            "size" => "L",
            "color" => "Blue",
            "personalization" => "None"
        ]
    ],
    "subtotal" => 49.99,
    "shipping_cost" => 5.00,
    "final_total" => 54.99,
    "payment_method" => "cash",
    "status" => "pending"
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo "HTTP Status Code: $httpCode\n";

    if ($httpCode === 200 || $httpCode === 201) {
        $responseData = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo "JSON Decode Error: " . json_last_error_msg() . "\n";
        } elseif ($responseData === null) {
            echo "Error: Response JSON is null.\n";
        } elseif (isset($responseData['error'])) {
            echo "API Error: " . $responseData['error'] . "\n";
        } else {
            echo "Formatted Response:\n" . json_encode($responseData, JSON_PRETTY_PRINT) . "\n";
        }
    } else {
        echo "API Error. HTTP Status Code: $httpCode\n";
        echo "Response:\n$response\n";
    }
}

curl_close($ch);