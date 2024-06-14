import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importe Routes et Route depuis react-router-dom pour gérer la navigation
import Home from './pages/home';
import ProjectDetail from './pages/project-detail';
import Erreur from './pages/erreur';
import Footer from './components/footer';
import MentionsLegales from './pages/mentions';

function App() {
  return (
    <>
      <Routes> {/* Déclaration de la navigation avec Routes */}
        <Route index element={<Home />} />
        <Route path="/:filter" element={<Home />} />
        <Route path="/projects/:idAndTitle" element={<ProjectDetail />} />
        <Route path="*" element={<Erreur />} />
        <Route path="/404" element={<Erreur />} />
        <Route path='/sitemap.xml'/>
        <Route path='/mentions-legales' element={<MentionsLegales />}/>
      </Routes>
      <Footer /> {/* Composant Footer qui est rendu à chaque fois en bas de l'application */}
    </>
  );
}

export default App;