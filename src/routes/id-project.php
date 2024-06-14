<?php
// Définit le type de contenu comme JSON
header('Content-Type: application/json');

// Inclut le fichier de connexion à la base de données
require("../config/connexion.php");

try {
    // Requête pour récupérer tous les projets avec leurs informations
    $query = "SELECT project_id, titre FROM projects";
    $statement = $connexion->query($query); // Exécute la requête SQL
    $projects = $statement->fetchAll(PDO::FETCH_ASSOC); // Récupère tous les résultats sous forme de tableau associatif

    echo json_encode($projects); // Convertit le tableau associatif en JSON et l'affiche
} catch (PDOException $e) {
    // En cas d'erreur PDO, génère une réponse JSON avec un message d'erreur
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}
?>
