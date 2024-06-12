import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import LazyImage from './LazyImage';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
/* eslint-disable no-unused-vars */

function ProjectDetails() {
  // Utilisez useParams pour obtenir les paramètres de l'URL
  const { idAndTitle } = useParams();
  // Divisez l'identifiant et le titre du projet à partir du paramètre de l'URL
  const [projectId, projectTitle] = idAndTitle.split('-');

  // Créez des états pour stocker les données du projet
  const [project, setProject] = useState(null);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [images, setImages] = useState([]);
  const [hash, setHash] = useState([]);
  const [alt, setAlt] = useState([]);
  const chemin = '../';

  const navigate = useNavigate();

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    async function FetchData() {
      try {
        const response = await fetch(`http://localhost/portfolio-react/portfolio/src/routes/project-detail.php?id=${projectId}`);
        if (!response.ok) {
          navigate("/404");
          throw new Error("projet introuvable ou inexistant");
        }
        const data = await response.json();
        setProject(data);
        setRoles(data.roles.split(',').map(role => role.trim()));
        setSkills(data.skills.split('|').map(skill => skill.trim()));
        setImages(data.images.split(',').map(image => image.trim()));
        setHash(data.hash.split('`').map(hash => hash.trim()));
        setAlt(data.alt.split(',').map(alt => alt.trim()));
      }
      catch (err) { console.error('Erreur lors de la récupération des données :', err) };
    }
    FetchData();
  }, [projectId]);

  if (project && project.tags) {
    return (
      <>
        {project.link && (
          <motion.div id='project-link'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -20 }
            }}
          >
            <a href={project.link} role='button' target="_blank" rel="noopener noreferrer">Découvrez le projet en ligne</a>
            <svg aria-hidden="true" role="img" width="16" height="13" viewBox="0 0 16 13" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className="button">
              <path d="M7.33812 13L0.974487 6.63637L7.33812 0.272736L7.92051 0.840917L2.53699 6.22444H15.591V7.0483H2.53699L7.92051 12.4176L7.33812 13Z" fillRule="black" />
            </svg>
          </motion.div>
        )}
        <motion.div className='title'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 }
          }}
        >
          <h1>{project.titre}</h1>
          <div>
            <p>{project.year}</p>
            <div>
              {project.tags.split(',').map((tag, index) => (
                <p key={index}>{tag.trim()}</p>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className='intro-img' aria-hidden="true" style={{ backgroundImage: `url('../${project.intro_img}')` }} aria-label="Image d'introduction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div className='recap'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          <div>
            <h2>Rôle(s)</h2>
            <ul>
              {roles.map((role, index) => (
                <li key={`role - ${index}`}>✺ {role}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Technologies et outils</h2>
            <p>{project.technologies}</p>
          </div>
          <div>
            <h2>Compétences développées</h2>
            <ul>
              {skills.map((skill, index) => (
                <li key={`skill - ${index}`}>✺ {skill}</li>
              ))}
            </ul>
          </div>
        </motion.div>
        <LazyLoadComponent>
          <motion.div className='explications'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
          >
            <h2>Le brief</h2>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.brief) }}></p>
          </motion.div>
  
          <motion.div className='explications'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
          >
            <h2>Ma démarche</h2>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.demarche) }}></p>
          </motion.div>
  
          <motion.div className='explications'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
          >
            <h2>Mon ressenti</h2>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.ressenti) }}></p>
          </motion.div>
        </LazyLoadComponent>
        <motion.div className='gallerie'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
        >
          <div>
            {images.slice(0, Math.ceil(images.length / 2)).map((image, index) => (
              <LazyImage
                key={`image-${index}`}
                src={chemin + image}
                alt={alt[index]}
                blurhash={hash[index]}
                role="img"
              />
            ))}
          </div>
          <div>
            {images.slice(Math.ceil(images.length / 2)).map((image, index) => (
              <LazyImage
                key={`image-${index + Math.ceil(images.length / 2)}`}
                src={chemin + image}
                alt={alt[index + Math.ceil(images.length / 2)]}
                blurhash={hash[index + Math.ceil(images.length / 2)]}
                role="img"
              />
            ))}
          </div>
        </motion.div>
        <div
          className='star'
          role="link"
          tabIndex="0"
          onClick={() => window.location.href = '/#contact'}
          rel='noopener'
          onKeyDown={(event) => handleKeyDown(event, () => window.location.href = '/#contact')}
          aria-label="Contactez-moi"
        >
          <p>Envie de travailler ensemble ?<br /><strong>Contactez-moi !</strong></p>
        </div>
      </>
    );
  }
}



export default ProjectDetails;