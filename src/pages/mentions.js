import React from 'react';
import '../styles/index.css';
import Nav from '../components/nav';
import Mentions from '../components/mentions'
import ScrollProgress from '../components/scroll-progress';
import Transition from '../components/transition';

function MentionsLegales() {
  return (
    <>
      <Transition />
      <Nav />
      <ScrollProgress />
      <Mentions />
    </>
  );
}

export default MentionsLegales;