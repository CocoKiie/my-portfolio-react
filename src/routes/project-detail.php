<?php
header('Content-Type: application/json');
require("../config/connexion.php");

try {
    // Vérifie si l'ID du projet est passé en paramètre
    if (!isset($_GET['id'])) {
        throw new Exception('ID du projet non spécifié.');
    }

    // Récupère l'ID du projet depuis les paramètres
    $id = $_GET['id'];

    // Requête pour récupérer les détails du projet avec l'ID spécifié
    $query = "SELECT projects.project_id, projects.titre, projects.year, projects.brief, projects.demarche, projects.ressenti, projects.link, projects.intro_img,
        GROUP_CONCAT(DISTINCT tags.tag_name SEPARATOR ', ') AS tags, 
        GROUP_CONCAT(DISTINCT roles.role_name SEPARATOR ', ') AS roles, 
        GROUP_CONCAT(DISTINCT skills.skill_name SEPARATOR '|') AS skills, 
        GROUP_CONCAT(DISTINCT technologies.technology_name SEPARATOR ', ') AS technologies,
        GROUP_CONCAT(DISTINCT project_photos.photo_url SEPARATOR ', ') AS images,
        GROUP_CONCAT(DISTINCT project_photos.photo_hash SEPARATOR '`') AS hash,
        GROUP_CONCAT(DISTINCT project_photos.photo_alt SEPARATOR ', ') AS alt
    FROM projects 
    LEFT JOIN project_tags ON projects.project_id = project_tags.project_id
    LEFT JOIN tags ON project_tags.tag_id = tags.tag_id
    LEFT JOIN project_roles ON projects.project_id = project_roles.project_id
    LEFT JOIN roles ON project_roles.role_id = roles.role_id
    LEFT JOIN project_skills ON projects.project_id = project_skills.project_id
    LEFT JOIN skills ON project_skills.skill_id = skills.skill_id
    LEFT JOIN project_technologies ON projects.project_id = project_technologies.project_id
    LEFT JOIN technologies ON project_technologies.technology_id = technologies.technology_id
    LEFT JOIN project_photos ON projects.project_id = project_photos.project_id
    WHERE projects.project_id = :id
    GROUP BY projects.project_id";

    $statement = $connexion->prepare($query);
    $statement->bindParam(':id', $id);
    $statement->execute();
    $project = $statement->fetch(PDO::FETCH_ASSOC);

    // Vérifie si le projet existe
    if (!$project) {
        throw new Exception('Projet non trouvé.');
    }

    // Si nécessaire, convertir les sauts de ligne dans les champs texte
    $fields_with_newlines = ['brief', 'demarche', 'ressenti'];
    foreach ($fields_with_newlines as $field) {
        if (isset($project[$field])) {
            $project[$field] = nl2br($project[$field]);
        }
    }

    // Retourne les détails du projet au format JSON
    echo json_encode($project);
} catch (Exception $e) {
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}
?>