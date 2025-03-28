const mongoose = require('mongoose');
const Candidature = require('./models/Candidature');
require('dotenv').config();

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grindin')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Tableau d'entreprises fictives
const entreprises = [
  'Google', 'Amazon', 'Facebook', 'Apple', 'Microsoft', 'Netflix', 'Spotify', 
  'Adobe', 'IBM', 'Intel', 'Oracle', 'Salesforce', 'Twitter', 'Uber', 'Airbnb',
  'Snapchat', 'LinkedIn', 'Pinterest', 'Slack', 'Zoom', 'Shopify', 'Twitch',
  'TikTok', 'Reddit', 'Dropbox', 'Stripe', 'Square', 'Palantir', 'Nvidia', 'Atlassian'
];

// Tableau de postes fictifs
const postes = [
  'Développeur Frontend', 'Développeur Backend', 'Développeur Fullstack', 
  'DevOps Engineer', 'Data Scientist', 'Product Manager', 'UX/UI Designer',
  'QA Engineer', 'System Administrator', 'Technical Project Manager',
  'Business Analyst', 'Mobile Developer', 'Security Engineer', 'Cloud Architect',
  'Machine Learning Engineer'
];

// Fonction pour générer une date aléatoire dans une plage
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Fonction pour générer un statut aléatoire avec des probabilités
const randomStatut = () => {
  const rand = Math.random();
  if (rand < 0.2) return 'accepté';
  if (rand < 0.6) return 'refusé';
  return 'en_attente';
};

// Générer des données fictives
const generateCandidatures = (count) => {
  const candidatures = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  for (let i = 0; i < count; i++) {
    const datePublication = randomDate(oneYearAgo, today);
    // La date de candidature est après la date de publication (entre 0 et 30 jours)
    const candidatureDelay = Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000;
    const dateCandidature = new Date(datePublication.getTime() + candidatureDelay);

    candidatures.push({
      entreprise: entreprises[Math.floor(Math.random() * entreprises.length)],
      poste: postes[Math.floor(Math.random() * postes.length)],
      lienOffre: `https://example.com/job/${Math.floor(Math.random() * 10000)}`,
      datePublication,
      dateCandidature,
      statut: randomStatut()
    });
  }

  return candidatures;
};

// Supprimer les données existantes et importer les nouvelles
const seedDatabase = async (count) => {
  try {
    await Candidature.deleteMany({});
    console.log('Toutes les candidatures ont été supprimées.');

    const candidatures = generateCandidatures(count);
    await Candidature.insertMany(candidatures);
    console.log(`${count} candidatures ont été ajoutées avec succès.`);

    // Afficher quelques statistiques
    const total = await Candidature.countDocuments();
    const acceptees = await Candidature.countDocuments({ statut: 'accepté' });
    const refusees = await Candidature.countDocuments({ statut: 'refusé' });
    const enAttente = await Candidature.countDocuments({ statut: 'en_attente' });

    console.log('\nStatistiques des données importées:');
    console.log(`Total: ${total} candidatures`);
    console.log(`Acceptées: ${acceptees} (${Math.round(acceptees/total*100)}%)`);
    console.log(`Refusées: ${refusees} (${Math.round(refusees/total*100)}%)`);
    console.log(`En attente: ${enAttente} (${Math.round(enAttente/total*100)}%)`);

    // Déconnexion de la base de données
    mongoose.disconnect();
  } catch (error) {
    console.error('Erreur lors du remplissage de la base de données:', error);
    mongoose.disconnect();
  }
};

// Importer 100 candidatures par défaut, ou le nombre spécifié en argument de ligne de commande
const count = process.argv[2] ? parseInt(process.argv[2]) : 100;
seedDatabase(count); 