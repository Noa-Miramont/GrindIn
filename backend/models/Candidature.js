const mongoose = require('mongoose');

const CandidatureSchema = new mongoose.Schema({
  entreprise: {
    type: String,
    required: true,
    trim: true
  },
  poste: {
    type: String,
    required: true,
    trim: true
  },
  datePostulation: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    enum: ['en_attente', 'entretien', 'refusé', 'accepté'],
    default: 'en_attente'
  },
  contact: {
    nom: String,
    email: String,
    telephone: String
  },
  notes: {
    type: String,
    trim: true
  },
  relances: [{
    date: {
      type: Date,
      default: Date.now
    },
    moyen: {
      type: String,
      enum: ['email', 'téléphone', 'autre'],
      required: true
    },
    notes: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidature', CandidatureSchema); 