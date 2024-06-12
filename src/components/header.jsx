import { motion } from "framer-motion";
import { useEffect } from "react";

function Header() {
  useEffect(() => {
    // Déclencher l'animation une fois que le composant est monté
    const headerAnimation = async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Attendez un court instant avant de démarrer l'animation pour laisser le temps au DOM de se mettre en place
      const header = document.getElementById('home');
      header.style.opacity = 1;
      header.style.transform = 'translateY(0)';
    };
    headerAnimation();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      window.location.href = '#projects';
    }
  };

  return (
    <motion.header
      aria-label="Page d'accueil" 
      id='home'
      initial={{ opacity: 0, y: -50 }} // Animation initial state
      animate={{ opacity: 1, y: 0 }} // Animation end state
      transition={{ duration: 0.5 }} // Animation duration
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} // Animation initial state
          animate={{ opacity: 1, y: 0 }} // Animation end state
          transition={{ delay: 0.2, duration: 0.5 }} // Animation duration with delay
          role="heading"
          aria-level={1}
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }} // Animation initial state
          animate={{ opacity: 1, y: 0 }} // Animation end state
          transition={{ delay: 0.4, duration: 0.5 }} // Animation duration with delay
        >
          Communication & Développement web
        </motion.p>
      </div>
      <motion.div
        className='star' 
        onClick={() => window.location.href = '#projects'}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
        whileHover={{ scale: 1.1 }} // Animation on hover
        whileTap={{ scale: 0.9 }} // Animation on tap
        aria-label="Découvrez mes projets"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }} // Animation initial state
          animate={{ opacity: 1, y: 0 }} // Animation end state
          transition={{ delay: 0.6, duration: 0.5 }} // Animation duration with delay
        >
          Découvrez mes <br/><strong>projets</strong>
        </motion.p>
      </motion.div>
    </motion.header>
  );
}

export default Header;