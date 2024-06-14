import React, { useState, useEffect } from 'react';
import highlight from '../vector.svg';
import { HashLink } from 'react-router-hash-link';

function Nav() {
  // État local pour gérer le thème sombre
  const [darkMode, setDarkMode] = useState(false);
  // État local pour gérer l'ouverture du menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Effet de chargement pour appliquer le thème sauvegardé depuis le localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      applyTheme(savedTheme === "dark");
    } else {
      applyTheme(false);
    }
  }, []);

  // Fonction pour basculer entre le thème sombre et clair
  function switchTheme() {
    var newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    applyTheme(newMode);
  }

  // Fonction pour appliquer le thème au corps du document
  function applyTheme(isDark) {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }

  // Fonction pour revenir à la page précédente
  function handleReturn() {
    window.history.back();
  }

  // Gestion de l'appui sur la touche Entrée pour basculer le thème
  function handleSwitchToggle(event) {
    if (event.key === "Enter") {
      switchTheme();
    }
  }

  // Fonction pour basculer l'état de menuOpen (ouverture/fermeture du menu)
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  // Rendu JSX du composant Navigation
  return (
    <nav role="navigation" aria-label="Navigation principale">
      {/* Bouton de bascule du menu */}
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} tabIndex={0} onClick={toggleMenu} onKeyPress={toggleMenu}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* Contenu du menu */}
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        {/* Logo avec lien vers l'accueil */}
        <div aria-label="Logo">
          <HashLink role="link" to="/#home" smooth={true} duration={500} offset={-100} aria-label="Revenir à l'accueil">
            Laurie Perbet
          </HashLink>
        </div>
        {/* Liste des liens de navigation */}
        <ul aria-label="Où voulez-vous naviguer ?">
          {/* Lien pour retourner à l'accueil */}
          <li>
            <HashLink role="link" to="/#home" smooth={true} duration={500} offset={-100} aria-label="Voir la page d'accueil">
              {/* SVG et image utilisés pour le lien actif */}
              <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='svg'>
                <path d="M20.1692 11.6599L11.9192 2.49325C11.5718 2.10642 10.9044 2.10642 10.557 2.49325L2.30701 11.6599C2.18826 11.7915 2.11032 11.9548 2.08265 12.1299C2.05499 12.3051 2.07879 12.4844 2.15118 12.6463C2.29784 12.9772 2.62601 13.1898 2.98809 13.1898H4.82143V19.6065C4.82143 19.8496 4.918 20.0828 5.08991 20.2547C5.26182 20.4266 5.49498 20.5232 5.73809 20.5232H8.48809C8.73121 20.5232 8.96437 20.4266 9.13627 20.2547C9.30818 20.0828 9.40476 19.8496 9.40476 19.6065V15.9398H13.0714V19.6065C13.0714 19.8496 13.168 20.0828 13.3399 20.2547C13.5118 20.4266 13.745 20.5232 13.9881 20.5232H16.7381C16.9812 20.5232 17.2144 20.4266 17.3863 20.2547C17.5582 20.0828 17.6548 19.8496 17.6548 19.6065V13.1898H19.4881C19.6656 13.1906 19.8395 13.1397 19.9886 13.0433C20.1377 12.9469 20.2555 12.8093 20.3277 12.6471C20.4 12.4849 20.4234 12.3052 20.3952 12.1299C20.3671 11.9546 20.2885 11.7913 20.1692 11.6599Z" fill="black" />
              </svg>
              {/* Image pour le lien actif */}
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          {/* Lien vers la section Projets */}
          <li>
            <HashLink role="link" to="/#projects" smooth={true} duration={500} offset={-100} aria-label="Voir la page projet">
              Projets
              {/* Image pour le lien actif */}
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          {/* Lien vers la section Contact */}
          <li>
            <HashLink role="link" to="/#contact" smooth={true} duration={500} offset={-100} aria-label="Voir la page de contact">
              Contact
              {/* Image pour le lien actif */}
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          {/* Bouton pour retourner à la page précédente */}
          <li className='return-button' onClick={handleReturn} onKeyPress={handleReturn} tabIndex="0" aria-label="Retour à la page précédente">
            <svg width="16" height="13" viewBox="0 0 16 13" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className="button">
              <path d="M7.33812 13L0.974487 6.63637L7.33812 0.272736L7.92051 0.840917L2.53699 6.22444H15.591V7.0483H2.53699L7.92051 12.4176L7.33812 13Z" fillRule="black" />
            </svg>
            Retour
          </li>
          {/* Bouton pour basculer entre le thème sombre et clair */}
          <li aria-label="Cliquez pour changez le thème visuel du site">
            <label for="theme" className="theme" aria-labelledby="theme">
              <span
                tabIndex="0"
                className="theme__toggle-wrap"
                onKeyDown={handleSwitchToggle}
                aria-labelledby='theme'
              >
                <input
                  id="theme"
                  className="theme__toggle"
                  type="checkbox"
                  role="switch"
                  name="theme"
                  aria-label={`Cliquez pour ${darkMode ? "désactiver" : "activer"} le thème sombre`}
                  value="light"
                  checked={darkMode}
                  onChange={switchTheme}
                />
                {/* Icône visuelle pour le thème */}
                <span className="theme__icon">
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                  <span className="theme__icon-part"></span>
                </span>
              </span>
            </label>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
