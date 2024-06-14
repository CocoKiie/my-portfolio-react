// Importer le module 'fs' de Node.js pour accéder aux fonctionnalités du système de fichiers
const fs = require('fs');

// Importer les classes 'SitemapStream' et 'streamToPromise' du module 'sitemap'
const { SitemapStream, streamToPromise } = require('sitemap');

// Importer dynamiquement le module 'node-fetch' pour effectuer des requêtes HTTP
const fetchPromise = import('node-fetch');

// Une fois que la promesse d'importation est résolue, extraire la fonction 'fetch' du module
fetchPromise.then(({ default: fetch }) => {
  // Définir le domaine de base pour le sitemap
  const DOMAIN = 'https://laurieperbet.great-site.net'; // ou 'https://localhost:3000/' pour les tests locaux
  
  // Définir l'URL de l'API pour récupérer les données des projets
  const API_URL = 'https://localhost/portfolio-react/portfolio/src/routes/id-project.php';

  // Déclaration de la fonction asynchrone pour générer le sitemap
  async function generateSitemap() {
    // Créer un nouveau flux de sitemap avec le nom de domaine comme option
    const sitemap = new SitemapStream({ hostname: DOMAIN });

    // Définir les liens statiques de base pour le sitemap
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/#accueil', changefreq: 'monthly', priority: 0.8 },
      { url: '/#projets', changefreq: 'monthly', priority: 0.8 },
      { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
    ];

    try {
      // Effectuer une requête HTTP GET à l'API pour récupérer les projets
      fetch(API_URL)
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(projects => {
          // Pour chaque projet récupéré, ajouter un lien dynamique au sitemap
          projects.forEach(project => {
            links.push({ url: `/project/${project.project_id}-${project.titre}`, changefreq: 'weekly', priority: 0.9 });
          });

          // Écrire chaque lien dans le flux de sitemap
          links.forEach(link => sitemap.write(link));
          sitemap.end(); // Terminer l'écriture du flux

          // Convertir le flux de sitemap en promesse et écrire le fichier sitemap.xml
          streamToPromise(sitemap).then(sm => {
            const sitemapData = sm.toString(); // Convertir le buffer en chaîne de caractères
            fs.writeFileSync('./public/sitemap.xml', sitemapData); // Écrire les données dans un fichier
            console.log('Sitemap generated successfully'); // Afficher un message de succès
          });
        })
        .catch(error => {
          // Gérer les erreurs lors de la récupération des données de l'API
          console.error('Erreur lors de la récupération des données:', error);
        });
    } catch (error) {
      // Gérer les erreurs lors de l'exécution de la fonction asynchrone
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  // Appeler la fonction pour générer le sitemap
  generateSitemap();
});