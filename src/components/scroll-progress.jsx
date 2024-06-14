// Importe les fonctions React, useState et useEffect depuis la bibliothèque React
import React, { useState, useEffect } from 'react';

// Importe useNavigate depuis react-router-dom pour la navigation programmatique
import { useNavigate } from 'react-router-dom';

// Importe motion depuis framer-motion pour les animations de composants
import { motion } from 'framer-motion';

// Désactive les avertissements pour les variables non utilisées
/* eslint-disable no-unused-vars */

// Définit le composant fonctionnel ScrollProgress
function ScrollProgress() {

  // Déclare l'état scrollPercentage avec une valeur initiale de 0, et la fonction setScrollPercentage pour le mettre à jour
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Initialise useNavigate pour la navigation dans l'application
  const navigate = useNavigate();

  // Fonction pour calculer le pourcentage de défilement de la page
  const calculateScrollPercentage = () => {
    // Récupère la position actuelle de défilement vertical (scrollY)
    const scrollPosition = window.scrollY;
    // Calcule la hauteur totale de la page en soustrayant la hauteur de la fenêtre (innerHeight) de la hauteur totale du document (scrollHeight)
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    // Calcule le pourcentage de défilement en arrondissant à l'entier le plus proche
    const percentage = Math.round((scrollPosition / totalHeight) * 100);
    // Met à jour l'état scrollPercentage avec le nouveau pourcentage calculé
    setScrollPercentage(percentage);
  };

  // Effet qui se déclenche après chaque rendu et à chaque changement de scrollPercentage
  useEffect(() => {
    // Appelle la fonction calculateScrollPercentage pour mettre à jour le pourcentage initial
    calculateScrollPercentage();

    // Fonction qui gère les événements de défilement
    const handleScroll = () => {
      calculateScrollPercentage(); // Recalcule le pourcentage de défilement à chaque événement de défilement
    };

    // Ajoute un écouteur d'événement de défilement à la fenêtre
    window.addEventListener('scroll', handleScroll);

    // Nettoie l'écouteur d'événement lors du démontage du composant pour éviter les fuites de mémoire
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Le tableau vide [] indique que cet effet ne dépend d'aucune variable et ne s'exécute qu'une seule fois après le premier rendu

  // Fonction qui remonte en haut de la page au clic sur le composant
  const handleScrollToTop = () => {
    window.scrollTo(0, 0); // Remonte la page au sommet en positionnant le défilement vertical à 0
  };

  // Rendu du composant ScrollProgress avec animation de motion.span
  return (
    <motion.span
      id="progress-value" // ID du composant span pour le style et l'accessibilité
      aria-label={`En cliquant sur la valeur vous retournerez en haut de la page, ${scrollPercentage}%`} // Description accessible du composant
      style={{ // Style inline pour le dégradé conique en fonction du pourcentage de défilement
        background: `conic-gradient(#DEAFE6 ${scrollPercentage}%, #FCE8FF ${scrollPercentage}%)`
      }}
      onClick={handleScrollToTop} // Gestionnaire d'événement au clic pour remonter en haut de la page
      role="button" // Rôle du composant pour l'accessibilité
      tabIndex={0} // TabIndex pour la navigation au clavier
    >
      <span>{`${scrollPercentage}%`}</span>
    </motion.span>
  );
}

// Exporte le composant ScrollProgress pour être utilisé dans d'autres parties de l'application
export default ScrollProgress;