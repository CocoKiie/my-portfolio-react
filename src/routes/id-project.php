<?php
header('Content-Type: application/json');
require("../config/connexion.php");

try {
    // Requête pour récupérer tous les projets avec leurs informations
    $query = "SELECT project_id, titre FROM projects";
    $statement = $connexion->query($query);
    $projects = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($projects);
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}
?>