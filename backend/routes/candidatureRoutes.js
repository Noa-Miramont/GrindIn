const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

// Routes principales
router.get('/', candidatureController.getCandidatures);
router.post('/', candidatureController.createCandidature);
router.get('/:id', candidatureController.getCandidatureById);
router.put('/:id', candidatureController.updateCandidature);
router.delete('/:id', candidatureController.deleteCandidature);

module.exports = router; 