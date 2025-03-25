const express = require('express');
const router = express.Router();
const relanceController = require('../controllers/relanceController');

// Routes pour les relances
// POST /api/relances/:candidatureId
// GET /api/relances/:candidatureId
// PUT /api/relances/:candidatureId/:relanceId
// DELETE /api/relances/:candidatureId/:relanceId

// POST /api/relances/:candidatureId - Ajouter une relance à une candidature
router.post('/:candidatureId', relanceController.addRelance);

// GET /api/relances/:candidatureId - Récupérer toutes les relances d'une candidature
router.get('/:candidatureId', relanceController.getRelancesByCandidature);

// PUT /api/relances/:candidatureId/:relanceId - Mettre à jour une relance
router.put('/:candidatureId/:relanceId', relanceController.updateRelance);

// DELETE /api/relances/:candidatureId/:relanceId - Supprimer une relance
router.delete('/:candidatureId/:relanceId', relanceController.deleteRelance);

// GET /api/relances/a-faire - Récupérer les candidatures à relancer (non mises à jour depuis 7 jours)
router.get('/a-faire', relanceController.getCandidaturesARelancer);

module.exports = router; 