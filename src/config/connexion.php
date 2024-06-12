<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$dsn = 'mysql:host=localhost;dbname=portfolio;charset=utf8mb4';
$username = 'root';
$password = '';

try {
    $connexion = new PDO($dsn, $username, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}

// REMPLIR MA BDD

// INSERT INTO projects (titre, year, ressenti, brief, demarche, intro_img) VALUES
// ('Projet 1', '2023', 'trop cool', 'faut faire une mission 1', 'j\'ai donc commencer la mission 1', 'url_de_la_photo1.jpg'),
// ('Projet 2', '2024', 'topissime', 'faut faire une mission 2', 'j\'ai donc commencer la mission 2', 'url_de_la_photo2.jpg');

// INSERT INTO tags (tag_name) VALUES
// ('Web'),
// ('Mobile'),
// ('Design'),
// ('Backend');

// INSERT INTO project_tags (project_id, tag_id) VALUES
// (1, 1),
// (1, 3),
// (2, 1),
// (2, 4);

// INSERT INTO roles (role_name) VALUES
// ('Développeur'),
// ('Chef de projet'),
// ('Designer');

// INSERT INTO technologies (technology_name) VALUES
// ('HTML'),
// ('CSS'),
// ('JavaScript'),
// ('PHP');

// INSERT INTO skills (skill_name) VALUES
// ('Gestion de projet'),
// ('Développement Web'),
// ('Design UX/UI');

// INSERT INTO project_roles (project_id, role_id) VALUES
// (1, 1),
// (1, 2),
// (2, 1),
// (2, 3);

// INSERT INTO project_technologies (project_id, technology_id) VALUES
// (1, 1),
// (1, 2),
// (1, 3),
// (2, 1),
// (2, 3),
// (2, 4);

// INSERT INTO project_skills (project_id, skill_id) VALUES
// (1, 1),
// (1, 2),
// (2, 1),
// (2, 3);

// INSERT INTO project_photos (project_id, photo_url) VALUES
// (1, 'url_de_la_photo1.jpg'),
// (1, 'url_de_la_photo2.jpg'),
// (2, 'url_de_la_photo3.jpg');

?>
