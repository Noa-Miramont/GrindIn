/**
 * Middleware de gestion des erreurs
 */
const errorHandler = (err, req, res, next) => {
  // Définir le code de statut de la réponse
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // MongoDB ValidationError
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erreur de validation',
      details: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
  
  // MongoDB CastError (généralement pour un ObjectId invalide)
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Ressource introuvable',
      details: 'ID de ressource invalide',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
  
  // Réponse standard pour les autres erreurs
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler; 