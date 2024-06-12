import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProjectDetail from './pages/project-detail';
import Erreur from './pages/erreur';
import ProjectErreur from './pages/project-erreur';
import Footer from './components/footer';
import MentionsLegales from './pages/mentions';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:filter" element={<Home />} />
        <Route path="/projects/:idAndTitle" element={<ProjectDetail />} />
        <Route path="/projects/*" element={<ProjectErreur />} />
        <Route path="*" element={<Erreur />} />
        <Route path='/sitemap.xml'/>
        <Route path='/mentions-legales' element={<MentionsLegales />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App;