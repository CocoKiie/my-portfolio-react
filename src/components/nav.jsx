import React, { useState, useEffect } from 'react';
import highlight from '../vector.svg';
import { HashLink } from 'react-router-hash-link';

function Nav() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      applyTheme(savedTheme === "dark");
    } else {
      applyTheme(false);
    }
  }, []);

  function switchTheme() {
    var newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    applyTheme(newMode);
  }

  function applyTheme(isDark) {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }

  function handleReturn() {
    window.history.back();
  }

  function handleSwitchToggle(event) {
    if (event.key === "Enter") {
      switchTheme();
    }
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav role="navigation" aria-label="Navigation principale">
      <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} tabIndex={0} onClick={toggleMenu} onKeyPress={toggleMenu}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <div aria-label="Logo">
          <HashLink role="link" to="/#home" smooth={true} duration={500} offset={-100} aria-label="Revenir à l'accueil">
            Laurie Perbet
          </HashLink>
        </div>
        <ul aria-label="Où voulez-vous naviguer ?">
          <li>
            <HashLink role="link" to="/#home" smooth={true} duration={500} offset={-100} aria-label="Voir la page d'accueil">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='svg'>
                <path d="M20.1692 11.6599L11.9192 2.49325C11.5718 2.10642 10.9044 2.10642 10.557 2.49325L2.30701 11.6599C2.18826 11.7915 2.11032 11.9548 2.08265 12.1299C2.05499 12.3051 2.07879 12.4844 2.15118 12.6463C2.29784 12.9772 2.62601 13.1898 2.98809 13.1898H4.82143V19.6065C4.82143 19.8496 4.918 20.0828 5.08991 20.2547C5.26182 20.4266 5.49498 20.5232 5.73809 20.5232H8.48809C8.73121 20.5232 8.96437 20.4266 9.13627 20.2547C9.30818 20.0828 9.40476 19.8496 9.40476 19.6065V15.9398H13.0714V19.6065C13.0714 19.8496 13.168 20.0828 13.3399 20.2547C13.5118 20.4266 13.745 20.5232 13.9881 20.5232H16.7381C16.9812 20.5232 17.2144 20.4266 17.3863 20.2547C17.5582 20.0828 17.6548 19.8496 17.6548 19.6065V13.1898H19.4881C19.6656 13.1906 19.8395 13.1397 19.9886 13.0433C20.1377 12.9469 20.2555 12.8093 20.3277 12.6471C20.4 12.4849 20.4234 12.3052 20.3952 12.1299C20.3671 11.9546 20.2885 11.7913 20.1692 11.6599Z" fill="black" />
              </svg>
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          <li>
            <HashLink role="link" to="/#projects" smooth={true} duration={500} offset={-100} aria-label="Voir la page projet">
              Projets
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          <li>
            <HashLink role="link" to="/#contact" smooth={true} duration={500} offset={-100} aria-label="Voir la page de contact">
              Contact
              <img src={highlight} alt="active" aria-hidden="true" />
            </HashLink>
          </li>
          <li className='return-button' onClick={handleReturn} onKeyPress={handleReturn} tabIndex="0" aria-label="Retour à la page précédente">
            <svg width="16" height="13" viewBox="0 0 16 13" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className="button">
              <path d="M7.33812 13L0.974487 6.63637L7.33812 0.272736L7.92051 0.840917L2.53699 6.22444H15.591V7.0483H2.53699L7.92051 12.4176L7.33812 13Z" fillRule="black" />
            </svg>
            Retour
          </li>
          <li aria-label="Cliquez pour changez le thème visuel du site">
            <label htmlFor="theme" className="theme">
              <span
                className="theme__toggle-wrap"
                tabIndex="0"
                role="button"
                onKeyDown={handleSwitchToggle}
              >
                <input
                  id="theme"
                  className="theme__toggle"
                  type="checkbox"
                  role="switch"
                  name="theme"
                  value="light"
                  checked={darkMode}
                  onChange={switchTheme}
                />
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
