// Contrôleur pour la gestion des relances 
const Candidature = require('../models/Candidature');

// Ajouter une relance à une candidature
exports.addRelance = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.candidatureId);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    candidature.relances.push(req.body);
    await candidature.save();
    res.status(201).json(candidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer toutes les relances d'une candidature
exports.getRelancesByCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.candidatureId);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    res.json(candidature.relances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une relance
exports.updateRelance = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.candidatureId);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    const relance = candidature.relances.id(req.params.relanceId);
    if (!relance) return res.status(404).json({ message: 'Relance non trouvée' });

    Object.assign(relance, req.body);
    await candidature.save();
    res.json(candidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une relance
exports.deleteRelance = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.candidatureId);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });

    const relance = candidature.relances.id(req.params.relanceId);
    if (!relance) return res.status(404).json({ message: 'Relance non trouvée' });

    relance.remove();
    await candidature.save();
    res.json({ message: 'Relance supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les candidatures à relancer (non mises à jour depuis 7 jours)
exports.getCandidaturesARelancer = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const candidatures = await Candidature.find({
      $or: [
        { 'relances.0': { $exists: false }, updatedAt: { $lt: sevenDaysAgo } },
        { 'relances.date': { $lt: sevenDaysAgo } }
      ]
    });

    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 