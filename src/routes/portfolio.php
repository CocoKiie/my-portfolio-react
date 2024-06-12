<?php
header('Content-Type: application/json');
require("../config/connexion.php");

try {
    // Requête pour récupérer tous les projets
    $query = "SELECT projects.project_id, projects.intro_img_hash, projects.intro_img_alt, projects.titre, projects.year, projects.short_description, projects.intro_img, projects.brief, projects.demarche, projects.ressenti, GROUP_CONCAT(tags.tag_name SEPARATOR ', ') AS tags
    FROM projects
    LEFT JOIN project_tags ON projects.project_id = project_tags.project_id
    LEFT JOIN tags ON project_tags.tag_id = tags.tag_id
    GROUP BY projects.project_id 
    ORDER BY year DESC";
    $statement = $connexion->query($query);
    $projects = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($projects);
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}

?>