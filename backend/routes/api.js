const express = require('express');
const router = express.Router();

const candidatureRoutes = require('./candidatureRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/candidatures', candidatureRoutes);
router.use('/stats', statsRoutes);

module.exports = router; 