<?php
// Définit le type de contenu comme JSON pour la réponse HTTP
header('Content-Type: application/json');

// Inclut le fichier de connexion à la base de données
require("../config/connexion.php");

try {
    // Requête SQL pour récupérer tous les enregistrements de la table 'tags'
    $query = "SELECT * FROM tags";
    $statement = $connexion->query($query); // Exécute la requête SQL
    $tags = $statement->fetchAll(PDO::FETCH_ASSOC); // Récupère tous les résultats sous forme de tableau associatif

    echo json_encode($tags); // Convertit le tableau associatif en JSON et l'affiche dans la réponse HTTP
} catch (PDOException $e) {
    // En cas d'erreur PDO, génère une réponse JSON avec un message d'erreur détaillé
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}
?>