const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/global', statsController.getGlobalStats);
router.get('/par-statut', statsController.getStatsByStatus);
router.get('/mensuel', statsController.getMonthlyStats);

module.exports = router;