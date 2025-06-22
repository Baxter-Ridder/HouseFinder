<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connexion BDD
    $host = "housefc425.mysql.db";
    $dbname = "housefc425";
    $user = "housefc425";
    $pass = "Housefinder59ldv";

    $conn = new mysqli($host, $user, $pass, $dbname);
    if ($conn->connect_error) {
        die("Erreur BDD: " . $conn->connect_error);
    }

    // Récupération et clear
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $subject = $conn->real_escape_string(trim($_POST['subject']));
    $message = $conn->real_escape_string(trim($_POST['message']));

    // Validation simple (ajoute ce que tu veux)
    if (strlen($name) < 4 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($subject) < 4 || empty($message)) {
        die("Erreur: données invalides.");
    }

    // Insert en BDD
    $sql = "INSERT INTO contacts (nom, email, sujet, message) VALUES ('$name', '$email', '$subject', '$message')";
    if (!$conn->query($sql)) {
        die("Erreur insertion: " . $conn->error);
    }

    // Envoi du mail
    $to = "formulaire_contact@housefinder.ovh"; // remplace par ton mail
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $body = "Nom: $name\nEmail: $email\nSujet: $subject\nMessage:\n$message";

    mail($to, $subject, $body, $headers);

    echo "Message bien envoyé, merci !";

    $conn->close();
}
?> 