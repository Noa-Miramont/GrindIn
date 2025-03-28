import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../config/api"
import '../style/PageNouvelleCandidature.css'

function PageNouvelleCandidature(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        entreprise: '',
        poste: '',
        lienOffre: '',
        datePublication: '',
        dateCandidature: '',
        statut: 'en_attente'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Formatage des dates pour correspondre au format attendu par le backend
            const formattedData = {
                ...formData,
                datePublication: new Date(formData.datePublication).toISOString(),
                dateCandidature: new Date(formData.dateCandidature).toISOString()
            };
            
            console.log('Données envoyées au serveur:', formattedData);
            console.log('URL de l\'API:', API_URL.CANDIDATURES.BASE);
            
            const response = await axios.post(API_URL.CANDIDATURES.BASE, formattedData);
            console.log('Réponse du serveur:', response.data);
            
            navigate('/');
        } catch (error) {
            console.error('Error adding candidature:', error);
            if (error.response) {
                console.error('Réponse d\'erreur:', error.response.data);
            }
            alert('Erreur lors de l\'ajout de la candidature');
        }
    };

    const handleTestSubmit = async () => {
        try {
            const testData = {
                entreprise: "Entreprise Test",
                poste: "Développeur Test",
                lienOffre: "https://example.com/job",
                datePublication: new Date().toISOString(),
                dateCandidature: new Date().toISOString(),
                statut: "en_attente"
            };
            
            console.log('Test - Données envoyées au serveur:', testData);
            console.log('Test - URL de l\'API:', API_URL.CANDIDATURES.BASE);
            
            const response = await axios.post(API_URL.CANDIDATURES.BASE, testData);
            console.log('Test - Réponse du serveur:', response.data);
            
            alert('Candidature de test créée avec succès!');
            navigate('/');
        } catch (error) {
            console.error('Test - Error adding candidature:', error);
            if (error.response) {
                console.error('Test - Réponse d\'erreur:', error.response.data);
            }
            alert('Erreur lors du test: ' + (error.response?.data?.message || error.message));
        }
    };

    return(
        <div>
            <div className="Header">
                <img src="../../static/Logo.svg" alt="Logo" />
            </div>
            <div className="Main">
                <div>
                    <h1 className="Title">Ajouter une candidature</h1>
                    <button 
                        type="button" 
                        onClick={handleTestSubmit}
                        style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Tester avec données prédéfinies
                    </button>
                    <div className="Form">
                        <form onSubmit={handleSubmit}>
                            <ul>
                                <li>
                                    <input 
                                        className="Text-Input" 
                                        type="text" 
                                        name="entreprise" 
                                        id="entreprise" 
                                        placeholder="Nom de l'entreprise..."
                                        value={formData.entreprise}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>

                                <li>
                                    <input 
                                        className="Text-Input" 
                                        type="text" 
                                        name="poste" 
                                        id="poste" 
                                        placeholder="Poste a pourvoir..."
                                        value={formData.poste}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>

                                <li>
                                    <input 
                                        className="Text-Input" 
                                        type="url" 
                                        name="lienOffre" 
                                        id="lienOffre" 
                                        placeholder="Lien vers l'offre..."
                                        value={formData.lienOffre}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>

                                <li className="Date-Field">
                                    <label htmlFor="datePublication">Date de publication de l'offre</label>
                                    <input 
                                        className="Date-Input" 
                                        type="date" 
                                        name="datePublication" 
                                        id="datePublication" 
                                        value={formData.datePublication}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>

                                <li className="Date-Field">
                                    <label htmlFor="dateCandidature">Date d'envoi de la candidature</label>
                                    <input 
                                        className="Date-Input" 
                                        type="date" 
                                        name="dateCandidature" 
                                        id="dateCandidature" 
                                        value={formData.dateCandidature}
                                        onChange={handleChange}
                                        required
                                    />
                                </li>
                                <div className="Submit-Container">
                                    <input className="Submit-Button" type="submit" value="ajouter ma candidature" />
                                </div>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNouvelleCandidature