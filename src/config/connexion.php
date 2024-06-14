<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$dsn = 'mysql:host=mysql-perret.alwaysdata.net;dbname=perret_portfolio;charset=utf8mb4'; //mysql:host=sql106.infinityfree.com;dbname=if0_36720236_portfolio;charset=utf8mb4
$username = 'perret'; //'if0_36720236'
$password = '4y5WN.mD@~_9,Dt' ; //'QCCP4sAiYma9'

try {
    $connexion = new PDO($dsn, $username, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>