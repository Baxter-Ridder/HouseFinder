<?php
header('Content-Type: application/json');

$host = "housefc425.mysql.db";
$dbname = "housefc425";
$user = "housefc425";
$pass = "Housefinder59ldv";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["error" => "Erreur de connexion BDD"]);
    exit;
}

$sql = "SELECT id, nom, email, sujet, message, date_envoi FROM contacts ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Erreur lors de la requête"]);
    exit;
}

$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}

echo json_encode($contacts);

$conn->close();
?>
