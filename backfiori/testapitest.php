<?php
// API URL
$api_url = 'https://respizenmedical.com/fiori/track_visitor.php'; // Replace with the actual URL of your API

// Get user IP and location using an external IP geolocation service
$ip_api_url = 'http://ip-api.com/json/'; // Free IP geolocation API
$user_ip_data = json_decode(file_get_contents($ip_api_url), true);

if ($user_ip_data && $user_ip_data['status'] === 'success') {
    $ip_visitors = $user_ip_data['query'];
    $city_visitors = $user_ip_data['city'];
    $country_visitors = $user_ip_data['country'];
} else {
    $ip_visitors = 'Unknown';
    $city_visitors = 'Unknown';
    $country_visitors = 'Unknown';
}

// Prepare POST data
$post_data = [
    'page_visitors' => 'homepage',
    'city_visitors' => $city_visitors,
    'country_visitors' => $country_visitors,
    'ip_visitors' => $ip_visitors,
    'date_visitors' => date('Y-m-d H:i:s') // Current date and time
];

// Initialize cURL session
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));

// Execute cURL request and get the response
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    // Display the response from the API
    echo "Response from API: " . $response;
}

// Close cURL session
curl_close($ch);
?>
