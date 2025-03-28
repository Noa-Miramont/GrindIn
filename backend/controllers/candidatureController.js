// Contrôleur pour la gestion des candidatures 
const Candidature = require('../models/Candidature');

// Récupérer toutes les candidatures (avec filtres optionnels)
exports.getCandidatures = async (req, res) => {
  try {
    const { entreprise, statut } = req.query;
    const filter = {};
    if (entreprise) filter.entreprise = entreprise;
    if (statut) filter.statut = statut;

    const candidatures = await Candidature.find(filter);
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle candidature
exports.createCandidature = async (req, res) => {
  try {
    console.log('Données reçues:', req.body);
    
    // Vérification des champs requis
    const { entreprise, poste, lienOffre, datePublication, dateCandidature } = req.body;
    if (!entreprise || !poste || !lienOffre || !datePublication || !dateCandidature) {
      return res.status(400).json({
        message: 'Tous les champs sont requis',
        missingFields: {
          entreprise: !entreprise,
          poste: !poste,
          lienOffre: !lienOffre,
          datePublication: !datePublication,
          dateCandidature: !dateCandidature
        }
      });
    }
    
    const candidature = new Candidature(req.body);
    await candidature.save();
    res.status(201).json(candidature);
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    res.status(400).json({ message: error.message, details: error });
  }
};

// Récupérer une candidature spécifique
exports.getCandidatureById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json(candidature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une candidature
exports.updateCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json(candidature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une candidature
exports.deleteCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndDelete(req.params.id);
    if (!candidature) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json({ message: 'Candidature supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filtrer les candidatures par statut
exports.getCandidaturesByStatus = async (req, res) => {
  try {
    const candidatures = await Candidature.find({ statut: req.params.status });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filtrer les candidatures par entreprise
exports.getCandidaturesByEntreprise = async (req, res) => {
  try {
    const candidatures = await Candidature.find({ entreprise: req.params.entreprise });
    res.json(candidatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 