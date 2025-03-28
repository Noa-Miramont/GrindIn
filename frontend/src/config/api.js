// Configuration de l'API
const BASE_URL = 'http://localhost:3000/api';

export const API_URL = {
    BASE: BASE_URL,
    CANDIDATURES: {
        BASE: `${BASE_URL}/candidatures`,
        BY_ID: (id) => `${BASE_URL}/candidatures/${id}`,
        BY_STATUS: (status) => `${BASE_URL}/candidatures/filter/status/${status}`,
        BY_ENTREPRISE: (entreprise) => `${BASE_URL}/candidatures/filter/entreprise/${entreprise}`
    }
}; 