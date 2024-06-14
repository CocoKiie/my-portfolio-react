import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';  // Importe DOMPurify pour nettoyer le HTML
import { LazyLoadComponent } from 'react-lazy-load-image-component';  // Importe LazyLoadComponent pour charger les composants paresseusement
import { motion } from 'framer-motion';  // Importe motion de framer-motion pour les animations

/* eslint-disable no-unused-vars */ //Pour retirer les erreurs no-unused-vars dans la console 

// Utilisez React.lazy pour importer LazyImage de manière asynchrone
const LazyImage = React.lazy(() => import('./LazyImage'));

function ProjectDetails() {
  const { idAndTitle } = useParams();  // Récupère les paramètres d'URL avec useParams
  const [projectId, projectTitle] = idAndTitle.split('-');  // Destructure l'ID et le titre du projet à partir de idAndTitle

  // États pour stocker les détails du projet, les rôles, les compétences, les images, les hash et les textes alternatifs
  const [project, setProject] = useState(null);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [images, setImages] = useState([]);
  const [hash, setHash] = useState([]);
  const [alt, setAlt] = useState([]);
  const chemin = '../';  // Chemin relatif pour les images

  const navigate = useNavigate();

  // Fonction pour gérer les événements clavier
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {  // Vérifie si la touche pressée est "Enter" ou " "
      event.preventDefault();  // Empêche le comportement par défaut
      action();  // Exécute l'action passée en paramètre
    }
  };

  // Effectue une requête pour récupérer les détails du projet au montage du composant
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://perret.alwaysdata.net/routes/project-detail.php?id=${projectId}`);  // Effectue une requête GET avec l'ID du projet
        if (!response.ok) {  // Si la réponse n'est pas OK
          navigate("/404");  // Redirige vers la page d'erreur 404
          throw new Error("projet introuvable ou inexistant");  // Lance une erreur
        }
        const data = await response.json();  // Convertit la réponse en JSON
        setProject(data);  // Met à jour l'état du projet avec les données récupérées
        // Sépare et nettoie les données pour les rôles, compétences, images, hash et textes alternatifs
        setRoles(data.roles.split(',').map(role => role.trim()));
        setSkills(data.skills.split('|').map(skill => skill.trim()));
        setImages(data.images.split(',').map(image => image.trim()));
        setHash(data.hash.split('`').map(hash => hash.trim()));
        setAlt(data.alt.split(',').map(alt => alt.trim()));
      } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);  // Affiche une erreur en cas d'échec de la récupération des données
      }
    }
    fetchData();  // Appelle la fonction fetchData au montage du composant
  }, [projectId, navigate]);  // Effectue le rechargement lorsque projectId ou navigate changent

  // Vérifie si le projet et les tags existent, puis retourne le JSX correspondant
  if (project && project.tags) {
    return (
      <>
        {/* Affiche le lien vers le projet en ligne s'il est disponible */}
        {project.link && (
          <motion.div
            id='project-link'
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
        {/* Affiche le titre, l'année et les tags du projet */}
        <motion.div
          className='title'
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
              {/* Mappe et affiche les tags du projet */}
              {project.tags.split(',').map((tag, index) => (
                <p key={index}>{tag.trim()}</p>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Affiche l'image d'introduction du projet */}
        <motion.div
          className='intro-img'
          aria-hidden="true"
          style={{ backgroundImage: `url('../${project.intro_img}')` }}
          aria-label="Image d'introduction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        {/* Affiche le récapitulatif des informations du projet */}
        <motion.div
          className='recap'
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
              {/* Map et affiche les rôles du projet */}
              {roles.map((role, index) => (
                <li key={`role-${index}`}>✺ {role}</li>
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
              {/* Map et affiche les compétences développées */}
              {skills.map((skill, index) => (
                <li key={`skill-${index}`}>✺ {skill}</li>
              ))}
            </ul>
          </div>
        </motion.div>
        {/* Charge paresseusement les explications du projet */}
        <LazyLoadComponent>
          <Suspense fallback={<div>Loading...</div>}>
            {/* Affiche les explications du brief */}
            <motion.div
              className='explications'
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
            {/* Affiche les explications de la démarche */}
            <motion.div
              className='explications'
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
            {/* Affiche les explications du ressenti */}
            <motion.div
              className='explications'
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
          </Suspense>
        </LazyLoadComponent>
        {/* Affiche la galerie d'images du projet */}
        <motion.div
          className='gallerie'
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
            {/* Map et affiche la première moitié des images */}
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
            {/* Map et affiche la deuxième moitié des images */}
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
        {/* Affiche le lien de contact */}
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

  // Affiche un message de chargement si le projet n'est pas chargé
  return <div>Loading...</div>;
}

export default ProjectDetails;