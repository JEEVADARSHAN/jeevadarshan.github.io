<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Recipient email address
    $to = "jeevadarshan11@gmail.com";

    // Subject
    $subject = "Contact Form Message from $name";

    // Message body
    $message_body = "Name: $name\nEmail: $email\nMessage:\n$message";

    // Headers
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $message_body, $headers)) {
        echo "Thank you for contacting us!";
    } else {
        echo "Sorry, something went wrong. Please try again later.";
    }
}
?>
