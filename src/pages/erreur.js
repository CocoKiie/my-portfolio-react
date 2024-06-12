import React from 'react';
import '../styles/index.css';
import Nav from '../components/nav';
import { Link } from 'react-router-dom';

function Erreur() {
  return (
    <div className='erreur-page'>
      <Nav />
      <p>Erreur 404</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default Erreur;