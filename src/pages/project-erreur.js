import React from 'react';
import '../styles/index.css';
import Nav from '../components/nav';
import Transition from '../components/transition';

function ProjectErreur() {
  return (
    <>
      <Transition />
      <Nav />
      <p>Projet introuvable</p>
    </>
  );
}

export default ProjectErreur;