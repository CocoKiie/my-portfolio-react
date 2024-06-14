import { motion } from "framer-motion"; // Importation de Framer Motion pour réaliser des animations

function Header() {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { // Si la touche appuyée est 'Enter' ou 'Espace'
      window.location.href = '#projects'; // Redirige vers l'ancre '#projects'
    }
  };

  return (
    <motion.header
      aria-label="Page d'accueil"
      id='home' // ID de l'élément pour l'animation
      initial={{ opacity: 0, y: -50 }} // État initial de l'animation : invisible (opacity: 0) et décalé vers le haut (y: -50)
      animate={{ opacity: 1, y: 0 }} // État final de l'animation : visible (opacity: 1) et position normale (y: 0)
      transition={{ duration: 0.5 }} // Durée de l'animation : 0.5 seconde
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} // État initial de l'animation pour le titre h1
          animate={{ opacity: 1, y: 0 }} // État final de l'animation pour le titre h1
          transition={{ delay: 0.2, duration: 0.5 }} // Durée de l'animation avec un délai de 0.2 seconde
          role="heading"
          aria-level={1}
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }} // État initial de l'animation pour le paragraphe p
          animate={{ opacity: 1, y: 0 }} // État final de l'animation pour le paragraphe p
          transition={{ delay: 0.4, duration: 0.5 }} // Durée de l'animation avec un délai de 0.4 seconde
        >
          Communication & Développement web
        </motion.p>
      </div>
      <motion.div
        className='star'
        onClick={() => window.location.href = '#projects'} // Redirection au clic vers l'ancre '#projects'
        onKeyPress={handleKeyPress} // Gestion de l'appui sur une touche
        role="button"
        tabIndex={0}
        whileHover={{ scale: 1.1 }} // Animation au survol : agrandissement à 110% de la taille originale
        whileTap={{ scale: 0.9 }} // Animation au toucher : réduction à 90% de la taille originale
        aria-label="Découvrez mes projets" // Description accessible
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }} // État initial de l'animation pour le paragraphe p à l'intérieur de 'star'
          animate={{ opacity: 1, y: 0 }} // État final de l'animation pour le paragraphe p à l'intérieur de 'star'
          transition={{ delay: 0.6, duration: 0.5 }} // Durée de l'animation avec un délai de 0.6 seconde
        >
          Découvrez mes <br/><strong>projets</strong>
        </motion.p>
      </motion.div>
    </motion.header>
  );
}

export default Header;