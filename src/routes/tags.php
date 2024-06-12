<?php
header('Content-Type: application/json');
require("../config/connexion.php");

try {
    // Requête pour récupérer tous les projets
    $query = "SELECT * FROM tags";
    $statement = $connexion->query($query);
    $tags = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tags);
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Erreur de récupération des données : ' . $e->getMessage()));
}

?>