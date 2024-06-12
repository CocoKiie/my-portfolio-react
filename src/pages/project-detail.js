import React from 'react';
import '../styles/App.css';
import ProjectDetails from '../components/project-details';
import Nav from '../components/nav';
import ScrollProgress from '../components/scroll-progress';
import Transition from '../components/transition';

function ProjectDetail() {

  return (
    <>
      <Transition />
      <div className='page2'>
        <ScrollProgress />
        <Nav />
        <ProjectDetails />
      </div>
    </>
  );
}

export default ProjectDetail;