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
  lienOffre: {
    type: String,
    required: true,
    trim: true
  },
  datePublication: {
    type: Date,
    required: true
  },
  dateCandidature: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['accepté', 'refusé', 'en_attente'],
    default: 'en_attente'
  }
}, {
  timestamps: true,
  collection: 'candidatures'
});

module.exports = mongoose.model('Candidature', CandidatureSchema); 