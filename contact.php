<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Méthode non autorisée.");
}

$mysqli = new mysqli("housefc425.mysql.db", "housefc425", "Housefinder59ldv", "housefc425");
if ($mysqli->connect_error) {
    http_response_code(500);
    exit("Erreur de connexion BDD.");
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (strlen($name) < 4 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($subject) < 4 || empty($message)) {
    http_response_code(400);
    exit("Données invalides.");
}

// Préparation de la requête
$stmt = $mysqli->prepare("INSERT INTO contacts (nom, email, sujet, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);
if (!$stmt->execute()) {
    http_response_code(500);
    exit("Erreur lors de l'insertion.");
}

// Mail
$to = "formulaire_contact@housefinder.ovh";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$body = "Nom: $name\nEmail: $email\nSujet: $subject\n\n$message";
mail($to, "Formulaire: $subject", $body, $headers);

echo "Message bien envoyé.";
$mysqli->close();
?>
