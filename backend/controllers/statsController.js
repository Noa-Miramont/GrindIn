// Contrôleur pour la gestion des statistiques 
const Candidature = require('../models/Candidature');

// Récupérer les statistiques globales
exports.getGlobalStats = async (req, res) => {
  try {
    const totalCandidatures = await Candidature.countDocuments();
    res.json({ totalCandidatures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les statistiques par statut
exports.getStatsByStatus = async (req, res) => {
  try {
    const stats = await Candidature.aggregate([
      { $group: { _id: '$statut', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les statistiques mensuelles
exports.getMonthlyStats = async (req, res) => {
  try {
    const stats = await Candidature.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 