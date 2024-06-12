import { Link } from 'react-router-dom';
import '../styles/App.css';

function Footer() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer aria-label='pied de page'>
      <div>
        <ul>
          <li>
            <Link to={"/mentions-legales"} onClick={handleClick}>Mentions Légales</Link>
          </li>
          <li>✺</li>
          <li>
            <Link to={"/sitemap.xml"} target='_blank'>Sitemap</Link>
          </li>
        </ul>
        Laurie PERBET © 2024 - Tout droits réservés
      </div>
    </footer>
  );
}

export default Footer;