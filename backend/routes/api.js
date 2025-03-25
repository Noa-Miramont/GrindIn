const express = require('express');
const router = express.Router();

const candidatureRoutes = require('./candidatureRoutes');
const relanceRoutes = require('./relanceRoutes');
const statsRoutes = require('./statsRoutes');

router.use('/candidatures', candidatureRoutes);
router.use('/relances', relanceRoutes);
router.use('/stats', statsRoutes);

module.exports = router; 