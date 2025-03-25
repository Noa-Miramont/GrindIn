const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Routes pour les statistiques
// GET /api/stats/global
// GET /api/stats/mensuel
// GET /api/stats/par-statut

// GET /api/stats/global - Récupérer les statistiques globales (nombre total de candidatures)
router.get('/global', statsController.getGlobalStats);

// GET /api/stats/par-statut - Récupérer les statistiques par statut
router.get('/par-statut', statsController.getStatsByStatus);

// GET /api/stats/mensuel - Récupérer les statistiques mensuelles
router.get('/mensuel', statsController.getMonthlyStats);

module.exports = router; 