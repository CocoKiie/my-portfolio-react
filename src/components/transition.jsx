// Importe React depuis la bibliothèque react
import React from 'react';

// Importe AnimatePresence et motion depuis framer-motion pour les animations
import { AnimatePresence, motion } from 'framer-motion';

// Définit le composant fonctionnel Transition
function Transition() {
    return (
        <AnimatePresence>
            {/* Utilisation de motion.div pour créer une animation */}
            <motion.div
                className="slide-out" // Classe CSS du div pour le style
                initial={{ scaleY: 1 }} // Propriétés initiales de l'animation (à l'entrée)
                animate={{ scaleY: 0 }} // Propriétés animées (pendant l'animation)
                exit={{ scaleY: 0 }} // Propriétés de sortie (à la sortie de l'élément)
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Configuration de la transition (durée et courbe d'animation)
            />
        </AnimatePresence>
    );
}

// Exporte le composant Transition pour être utilisé dans d'autres parties de l'application
export default Transition;