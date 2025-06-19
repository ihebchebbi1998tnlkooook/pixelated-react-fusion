<?php
// SMTP details
$smtp_host = 'ssl0.ovh.net';
$smtp_port = 465; // SSL port
$smtp_user = 'orders@fioriforyou.com'; // Your OVH email address
$smtp_pass = 'YOUR_PASSWORD'; // Your OVH email password

// Email details
$from = 'orders@fioriforyou.com';
$to = 'erzerino2@gmail.com';
$subject = 'Test Email';
$body = 'Hello! This is a test email sent using OVH SMTP.';

// Create the email headers
$headers = "From: $from\r\n";
$headers .= "To: $to\r\n";
$headers .= "Subject: $subject\r\n";
$headers .= "\r\n";

// Open a socket connection to the SMTP server
$smtp = fsockopen("ssl://$smtp_host", $smtp_port, $errno, $errstr, 15);

if (!$smtp) {
    die("Could not connect to SMTP server: $errstr ($errno)\n");
}

// Read server response
function smtp_read($smtp) {
    $response = '';
    while ($str = fgets($smtp, 515)) {
        $response .= $str;
        if (substr($str, 3, 1) == ' ') break;
    }
    return $response;
}

// Send commands to the server
function smtp_send($smtp, $command) {
    fwrite($smtp, $command . "\r\n");
    return smtp_read($smtp);
}

// Begin the SMTP conversation
echo smtp_read($smtp); // Server greeting

echo smtp_send($smtp, "EHLO fioriforyou.com"); // Identify yourself
echo smtp_send($smtp, "AUTH LOGIN"); // Request authentication
echo smtp_send($smtp, base64_encode($smtp_user)); // Send username
echo smtp_send($smtp, base64_encode($smtp_pass)); // Send password

// Specify the sender and recipient
echo smtp_send($smtp, "MAIL FROM:<$from>");
echo smtp_send($smtp, "RCPT TO:<$to>");

// Send the email data
echo smtp_send($smtp, "DATA");
fwrite($smtp, $headers . $body . "\r\n.\r\n"); // End email with a single dot on a line
echo smtp_read($smtp);

// Close the connection
echo smtp_send($smtp, "QUIT");
fclose($smtp);

echo "Email sent successfully!";
?>
