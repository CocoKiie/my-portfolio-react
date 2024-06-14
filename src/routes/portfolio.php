<?php
// Définir l'en-tête de la réponse HTTP comme du JSON
header('Content-Type: application/json');

// Inclure le fichier de configuration pour la connexion à la base de données
require("../config/connexion.php");

try {
    // Définir la requête SQL pour récupérer tous les projets avec leurs tags
    $query = "SELECT projects.project_id, projects.intro_img_hash, projects.intro_img_alt, projects.titre, projects.year, projects.short_description, projects.intro_img, projects.brief, projects.demarche, projects.ressenti, GROUP_CONCAT(tags.tag_name SEPARATOR ', ') AS tags
    FROM projects
    LEFT JOIN project_tags ON projects.project_id = project_tags.project_id
    LEFT JOIN tags ON project_tags.tag_id = tags.tag_id
    GROUP BY projects.project_id 
    ORDER BY year DESC";
    
    // Exécuter la requête SQL
    $statement = $connexion->query($query);
    
    // Récupérer tous les résultats sous forme de tableau associatif
    $projects = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Convertir le tableau associatif en JSON et l'envoyer comme réponse
    echo json_encode($projects);
} catch (PDOException $e) {
    // En cas d'erreur, retourner un message d'erreur en JSON
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}
?>