<?php
$to = "erzerino2@gmail.com";
$subject = "Test Email";
$message = "This is a test email.";
$headers = "From: no-reply@fioriforyou.com";

if(mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully.";
} else {
    echo "Failed to send email.";
}
?>
