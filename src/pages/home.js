import React from 'react';
import '../styles/index.css';
import Header from '../components/header';
import Projects from '../components/projects-section';
import Contact from '../components/contact';
import Nav from '../components/nav';
import ScrollProgress from '../components/scroll-progress';
import Transition from '../components/transition';

function Home() {
  return (
    <>
      <Transition />
      <Nav />
      <ScrollProgress />
      <Header />
      <Projects />
      <Contact />
    </>
  );
}

export default Home;