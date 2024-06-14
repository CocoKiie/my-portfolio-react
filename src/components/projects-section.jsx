import '../styles/App.css';

import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

// Importe LazyImage en utilisant lazy loading
const LazyImage = lazy(() => import('./LazyImage'));

// Définit le composant fonctionnel Projects
function Projects() {
  // Déclare les différents états nécessaires au composant
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [tags, setTags] = useState([]);

  // Utilisation de useInView pour détecter si le composant est dans la vue
  const { ref, inView } = useInView();
  
  // Référence pour l'animation
  const animationRef = useRef(null);

  // Hook de navigation
  const navigate = useNavigate();

  // Récupère le paramètre de filtre depuis l'URL
  const { filter } = useParams();

  // Effectue une requête pour récupérer les tags au montage du composant
  useEffect(() => {
    fetch('https://perret.alwaysdata.net/routes/tags.php')
      .then(response => response.json())
      .then(data => {
        setTags(data);  // Met à jour l'état tags avec les données reçues du serveur
      })
      .catch(error => console.error('Erreur lors de la récupération des tags:', error));

    fetch('https://perret.alwaysdata.net/routes/portfolio.php')
      .then(response => response.json())
      .then(data => {
        setProjects(data);  // Met à jour l'état projects avec les données reçues du serveur
        setFilteredProjects(data);  // Initialise filteredProjects avec toutes les données reçues
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  // Effectue des actions lorsque le composant entre dans la vue
  useEffect(() => {
    if (inView) {
      animationRef.current.style.opacity = 1;  // Animer l'opacité lorsque le composant entre dans la vue
      animationRef.current.style.transform = 'translateY(0)';  // Animer la translation verticale
    }
  }, [inView]);

  // Effectue des actions lorsque les tags ou le tag sélectionné changent
  useEffect(() => {
    const elements = document.querySelectorAll('.filtres li');  // Sélectionne tous les éléments li dans .filtres
    elements.forEach(element => {
      const originalText = element.getAttribute('data-original-text');  // Récupère le texte original depuis l'attribut data-original-text
      if (!element.classList.contains('active')) {  // Vérifie si l'élément ne contient pas la classe active
        const textWithoutEmoji = originalText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');  // Supprime les emojis du texte
        element.textContent = textWithoutEmoji;  // Met à jour le texte de l'élément
      } else {
        element.textContent = originalText;  // Restaure le texte original si l'élément est actif
      }
    });
  }, [tags, selectedTag]);

  // Fonction de filtrage des projets en fonction d'un tag
  const filterProjects = useCallback((tag) => {
    if (tag === 'all') {
      setFilteredProjects(projects);  // Affiche tous les projets
    } else {
      const filtered = projects.filter(project => project.tags && project.tags.includes(tag));  // Filtre les projets par tag
      setFilteredProjects(filtered);  // Met à jour filteredProjects avec les projets filtrés
    }
    setSelectedTag(tag);  // Met à jour le tag sélectionné
    setVisibleProjects(6);  // Affiche 6 projets à la fois
  }, [projects]);

  // Effectue le filtrage des projets lorsque le paramètre de filtre change
  useEffect(() => {
    if (filter) {
      filterProjects(filter);  // Filtre les projets en fonction du paramètre de filtre
    } else {
      filterProjects('all');  // Affiche tous les projets si aucun filtre n'est appliqué
    }
  }, [filter, filterProjects]);

  // Fonction pour charger plus de projets
  const handleShowMore = () => {
    setVisibleProjects(prev => prev + 6);  // Augmente le nombre de projets visibles de 6
  };

  // Fonction pour gérer le clic sur un filtre
  const handleFilterClick = (tag) => {
    const encodedTag = encodeURIComponent(tag);  // Encode le tag pour l'URL
    navigate(`/${encodedTag}`);  // Navigue vers l'URL avec le tag en tant que paramètre
  };

  // Fonction pour gérer la pression de touche sur un filtre
  const handleKeyPress = (event, tag) => {
    if (event.key === 'Enter' || event.key === ' ') {  // Vérifie si la touche pressée est "Enter" ou " "
      handleFilterClick(tag);  // Gère le clic sur le filtre
    }
  };

  // Retourne le JSX du composant Projects
  return (
    <>
      {/* Emplacement pour afficher les projets */}
      <div id='projects'></div>
      {/* Utilisation de LazyLoadComponent pour le chargement paresseux */}
      <LazyLoadComponent>
        <section className='projects' ref={ref} aria-label='Page Projets'>
          {/* Titre des projets animé */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}  // Définit les propriétés initiales de l'animation
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}  // Anime l'opacité et la translation verticale en fonction de inView
            transition={{ duration: 0.5 }}  // Définit la durée de l'animation
            role="heading"  // Rôle sémantique
            aria-level={2}  // Niveau de titre pour l'accessibilité
            className='projet-titre'  // Classe CSS
          >
            Mes projets  {/* Texte du titre */}
          </motion.h2>

          {/* Contenu des projets avec animation */}
          <motion.div
            ref={animationRef}  // Référence pour l'élément animé
            initial={{ opacity: 0, translateY: -20 }}  // Définit les propriétés initiales de l'animation
            animate={inView ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: -20 }}  // Anime l'opacité et la translation verticale en fonction de inView
            transition={{ duration: 0.5, delay: 0.2 }}  // Définit la durée et le délai de l'animation
          >
            {/* Liste des filtres */}
            <ul role='menu' className='filtres' aria-label='Liste des filtres disponibles'>
              {/* Filtre pour voir tous les projets */}
              <motion.li
                onClick={() => handleFilterClick('all')}  // Gère le clic sur le filtre "Tout"
                onKeyPress={(e) => handleKeyPress(e, 'all')}  // Gère la pression de touche sur le filtre "Tout"
                tabIndex={0}  // Ordre de tabulation
                role="menuitem"  // Rôle sémantique
                aria-label="Voir tous les projets"  // Texte alternatif pour l'accessibilité
                className={selectedTag === 'all' ? 'active' : ''}  // Classe CSS conditionnelle
                data-original-text="🔥 Tout"  // Texte original à afficher dans le filtre
              >
                <span>🔥</span>Tout  {/* Icône et texte du filtre */}
              </motion.li>
              {/* Mapping des tags pour afficher les filtres disponibles */}
              {tags.map((tag, index) => (
                <motion.li
                  key={index}  // Clé unique pour chaque élément de la liste
                  onClick={() => handleFilterClick(tag.tag_name)}  // Gère le clic sur un filtre tag
                  onKeyPress={(e) => handleKeyPress(e, tag.tag_name)}  // Gère la pression de touche sur un filtre tag
                  tabIndex={0}  // Ordre de tabulation
                  role="menuitem"  // Rôle sémantique
                  aria-label={`Voir les projets en ${tag.tag_name}`}  // Texte alternatif pour l'accessibilité
                  className={selectedTag === tag.tag_name ? 'active' : ''}  // Classe CSS conditionnelle
                  data-original-text={tag.tag_name}  // Texte original à afficher dans le filtre
                >
                  {tag.tag_name}  {/* Texte du filtre tag */}
                </motion.li>
              ))}
            </ul>
            {/* Liste des projets */}
            <LazyLoadComponent>
              <div>
                <ul className='projects-list' aria-label='Liste des projets, pour voir plus de détails, cliquez dessus'>
                  {/* Mapping des projets filtrés */}
                  {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                    <motion.li key={index} role='listitem'>
                      <Link to={`/projects/${project.project_id}-${project.titre}`} aria-label={`Voir le projet "${project.titre}"`} role="link">
                        {/* Chargement paresseux de l'image du projet */}
                        <Suspense fallback={<div>Loading...</div>}>
                          <LazyImage
                            src={`../${project.intro_img}`}
                            alt={project.intro_img_alt} 
                            blurhash={project.intro_img_hash}  // Hash de flou
                            role="img" 
                          />
                        </Suspense>
                        {/* Informations sur le projet */}
                        <div>
                          <h3>{project.titre}</h3>
                          <p>{project.year}</p> 
                        </div>
                        {/* Overlay des informations du projet */}
                        <div className='projects-overlay'>
                          <p>
                            {project.short_description}<br /><br />
                            {project.tags && (
                              <span>
                                <strong>Missions :</strong>
                                {project.tags.replace(/[\uD800-\uDFFF]/g, "").replace(/[\u200D\uFE0F]/g, "")} {/*Remplace les caractères spéciaux*/}
                              </span>
                            )}
                          </p>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                {/* Bouton pour charger plus de projets */}
                {filteredProjects.length > visibleProjects && (
                  <motion.div className='voir-plus'>
                    <button onClick={handleShowMore} aria-label='Voir plus de projets'>Voir plus</button>
                  </motion.div>
                )}
              </div>
            </LazyLoadComponent>
          </motion.div>
        </section >
      </LazyLoadComponent>
    </>
  );
}

// Exporte le composant Projects pour être utilisé ailleurs dans l'application
export default Projects;