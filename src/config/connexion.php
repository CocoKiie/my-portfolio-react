<?php

// Définit le type de contenu comme JSON avec l'encodage UTF-8
header("Content-Type: application/json; charset=UTF-8");

// Autorise l'accès depuis n'importe quelle origine (CORS)
header("Access-Control-Allow-Origin: *");

// Autorise les méthodes HTTP GET, POST et OPTIONS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Autorise les en-têtes spécifiés dans les requêtes
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Informations de connexion à la base de données MySQL
$dsn = 'mysql:host=mysql-perret.alwaysdata.net;dbname=perret_portfolio;charset=utf8mb4';
$username = 'perret';
$password = '4y5WN.mD@~_9,Dt';

try {
    // Tente de se connecter à la base de données MySQL
    $connexion = new PDO($dsn, $username, $password);

    // Configure PDO pour qu'il lance des exceptions en cas d'erreur
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // En cas d'erreur de connexion, affiche un message d'erreur
    echo "Erreur de connexion : " . $e->getMessage();
}

?>