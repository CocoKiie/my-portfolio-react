import '../styles/App.css';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import LazyImage from './LazyImage';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [tags, setTags] = useState([]);
  const { ref, inView } = useInView();
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const { filter } = useParams();

  useEffect(() => {
    fetch('http://localhost/portfolio-react/portfolio/src/routes/tags.php')
      .then(response => response.json())
      .then(data => {
        setTags(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des tags:', error));

    fetch('http://localhost/portfolio-react/portfolio/src/routes/portfolio.php')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  useEffect(() => {
    if (inView) {
      animationRef.current.style.opacity = 1;
      animationRef.current.style.transform = 'translateY(0)';
    }
  }, [inView]);

  useEffect(() => {
    const elements = document.querySelectorAll('.filtres li');
    elements.forEach(element => {
      const originalText = element.getAttribute('data-original-text');
      if (!element.classList.contains('active')) {
        const textWithoutEmoji = originalText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
        element.textContent = textWithoutEmoji;
      } else {
        element.textContent = originalText;
      }
    });
  }, [tags, selectedTag]);

  const filterProjects = useCallback((tag) => {
    if (tag === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.tags && project.tags.includes(tag));
      setFilteredProjects(filtered);
    }
    setSelectedTag(tag);
    setVisibleProjects(6);
  }, [projects]);

  useEffect(() => {
    if (filter) {
      filterProjects(filter);
    } else {
      filterProjects('all');
    }
  }, [filter, filterProjects]);

  const handleShowMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  const handleFilterClick = (tag) => {
    const encodedTag = encodeURIComponent(tag);
    navigate(`/${encodedTag}`);
  };

  const handleKeyPress = (event, tag) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleFilterClick(tag);
    }
  };

  return (
    <LazyLoadComponent>
      <section className='projects' id='projects' ref={ref} aria-label='Page Projets'>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Mes projets
        </motion.h2>
        <motion.div
          ref={animationRef}
          initial={{ opacity: 0, translateY: -20 }}
          animate={inView ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Filtres */}
          <ul role='menu' className='filtres' aria-label='Liste des filtres disponibles'>
            <motion.li
              onClick={() => handleFilterClick('all')}
              onKeyPress={(e) => handleKeyPress(e, 'all')}
              tabIndex={0}
              role="menuitem"
              className={selectedTag === 'all' ? 'active' : ''}
              data-original-text="🔥 Tout"
            >
              <span>🔥</span>Tout
            </motion.li>
            {tags.map((tag, index) => (
              <motion.li
                key={index}
                onClick={() => handleFilterClick(tag.tag_name)}
                onKeyPress={(e) => handleKeyPress(e, tag.tag_name)}
                tabIndex={0}
                role="button"
                className={selectedTag === tag.tag_name ? 'active' : ''}
                data-original-text={tag.tag_name}
              >
                {tag.tag_name}
              </motion.li>
            ))}
          </ul>

          {/* Projets */}
          <LazyLoadComponent>
            <div>
              <ul role='listbox' className='projects-list' aria-label='Liste des projets, pour voir plus de détails, cliquez dessus'>
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <motion.li key={index} role='listboxitem'>
                    <Link to={`/projects/${project.project_id}-${project.titre}`} role="link">
                      <LazyImage
                        src={`../${project.intro_img}`}
                        alt={project.intro_img_alt}
                        blurhash={project.intro_img_hash}
                        role="img"
                      />

                      <div>
                        <h3>{project.titre}</h3>
                        <p>{project.year}</p>
                      </div>
                      <div className='projects-overlay'>
                        <p>
                          {project.short_description}<br /><br />
                          {project.tags && (
                            <span>
                              <strong>Missions :</strong>{" "}
                              {project.tags.replace(/[\uD800-\uDFFF]/g, "").replace(/[\u200D\uFE0F]/g, "")}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              {filteredProjects.length > visibleProjects && (
                <motion.div className='voir-plus'>
                  <button onClick={handleShowMore}>Voir plus</button>
                </motion.div>
              )}
            </div>
            </LazyLoadComponent>
        </motion.div>
      </section>
    </LazyLoadComponent>
  );
}

export default Projects;
