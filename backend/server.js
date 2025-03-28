const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes/api');
const cors = require('cors');

// Chargement des variables d'environnement
dotenv.config();

const app = express();

// Middleware CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Routes API
app.use('/api', apiRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;

// Connexion à la base de données puis démarrage du serveur
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données:', err.message);
    process.exit(1);
  }); 