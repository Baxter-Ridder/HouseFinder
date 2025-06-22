<?php
header('Content-Type: application/json');

$mysqli = new mysqli("housefc425.mysql.db", "housefc425", "Housefinder59ldv", "housefc425");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion à la base de données."]);
    exit;
}

$sql = "SELECT id, nom, email, sujet, message, date_envoi FROM contacts ORDER BY date_envoi DESC";
$result = $mysqli->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la requête."]);
    exit;
}

$contacts = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($contacts);

$mysqli->close();
?>
