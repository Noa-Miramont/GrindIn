const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

// Routes pour les candidatures
// GET /api/candidatures
// POST /api/candidatures
// GET /api/candidatures/:id
// PUT /api/candidatures/:id
// DELETE /api/candidatures/:id

// GET /api/candidatures - Récupérer toutes les candidatures (avec filtres optionnels)
router.get('/', candidatureController.getCandidatures);

// POST /api/candidatures - Créer une nouvelle candidature
router.post('/', candidatureController.createCandidature);

// GET /api/candidatures/:id - Récupérer une candidature spécifique
router.get('/:id', candidatureController.getCandidatureById);

// PUT /api/candidatures/:id - Mettre à jour une candidature
router.put('/:id', candidatureController.updateCandidature);

// DELETE /api/candidatures/:id - Supprimer une candidature
router.delete('/:id', candidatureController.deleteCandidature);

// GET /api/candidatures/filter/status/:status - Filtrer les candidatures par statut
router.get('/filter/status/:status', candidatureController.getCandidaturesByStatus);

// GET /api/candidatures/filter/entreprise/:entreprise - Filtrer les candidatures par entreprise
router.get('/filter/entreprise/:entreprise', candidatureController.getCandidaturesByEntreprise);

module.exports = router; 