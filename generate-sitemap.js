const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// Importer dynamiquement node-fetch
const fetchPromise = import('node-fetch');
fetchPromise.then(({ default: fetch }) => {
  const DOMAIN = 'http://localhost:3000/';
  const API_URL = 'http://localhost/portfolio-react/portfolio/src/routes/id-project.php';

  async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: DOMAIN });

    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/#accueil', changefreq: 'monthly', priority: 0.8 },
      { url: '/#projets', changefreq: 'monthly', priority: 0.8 },
      { url: '/#contact', changefreq: 'monthly', priority: 0.8 },
    ];

    try {
      fetch(API_URL)
        .then(response => response.json())
        .then(projects => {
          projects.forEach(project => {
            links.push({ url: `/project/${project.project_id}%${project.titre}`, changefreq: 'weekly', priority: 0.9 });
          });

          links.forEach(link => sitemap.write(link));
          sitemap.end();

          streamToPromise(sitemap).then(sm => {
            const sitemapData = sm.toString();
            fs.writeFileSync('./public/sitemap.xml', sitemapData);
            console.log('Sitemap generated successfully');
          });
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }

  generateSitemap();
});