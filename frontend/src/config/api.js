// Configuration de l'API
const BASE_URL = 'http://localhost:3000/api';

export const API_URL = {
    BASE: BASE_URL,
    CANDIDATURES: {
        BASE: `${BASE_URL}/candidatures`,
        BY_ID: (id) => `${BASE_URL}/candidatures/${id}`,
        WITH_FILTERS: (filters) => {
            let url = `${BASE_URL}/candidatures`;
            const params = new URLSearchParams();
            
            if (filters.statut && filters.statut !== 'relances') {
                params.append('statut', filters.statut);
            }
            
            if (filters.entreprise) {
                params.append('entreprise', filters.entreprise);
            }
            
            // Special filter for applications older than one week
            if (filters.statut === 'relances') {
                params.append('olderThanOneWeek', 'true');
            }
            
            const queryString = params.toString();
            return queryString ? `${url}?${queryString}` : url;
        }
    }
}; 