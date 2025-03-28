/**
 * Calcule la date de la prochaine relance recommandée
 * @param {Date} datePostulation - Date de la postulation initiale
 * @param {Array} relancesExistantes - Tableau des relances déjà effectuées
 * @returns {Date} Date recommandée pour la prochaine relance
 */
const calculerDateProchaineSuivi = (datePostulation, relancesExistantes = []) => {
  if (!datePostulation) {
    return new Date();
  }
  
  const datePostulationObj = new Date(datePostulation);
  
  // Si aucune relance n'a été effectuée, prévoir une relance 7 jours après la postulation
  if (!relancesExistantes.length) {
    const dateRelance = new Date(datePostulationObj);
    dateRelance.setDate(dateRelance.getDate() + 7);
    return dateRelance;
  }
  
  // Si des relances ont déjà été effectuées, prévoir la prochaine 14 jours après la dernière
  const derniereRelance = new Date(Math.max(...relancesExistantes.map(r => new Date(r.date).getTime())));
  const dateRelance = new Date(derniereRelance);
  dateRelance.setDate(dateRelance.getDate() + 14);
  return dateRelance;
};

/**
 * Vérifie si une candidature nécessite une relance
 * @param {Object} candidature - Objet candidature
 * @returns {Boolean} True si une relance est recommandée
 */
const necessiteRelance = (candidature) => {
  if (!candidature || candidature.statut !== 'en_attente') {
    return false;
  }
  
  const dateCandidature = new Date(candidature.dateCandidature);
  const today = new Date();
  
  // Une relance est recommandée après 7 jours sans réponse
  const differenceEnJours = Math.floor((today - dateCandidature) / (1000 * 60 * 60 * 24));
  
  return differenceEnJours >= 7;
};

module.exports = {
  calculerDateProchaineSuivi,
  necessiteRelance
}; 