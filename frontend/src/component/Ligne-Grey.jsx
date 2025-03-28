import React, { useState } from "react"
import axios from "axios"
import { API_URL } from "../config/api"
import '../style/Ligne-Grey.css'

function LigneGrey({ candidature, getStatusComponent, onDelete }){
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    
    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put(API_URL.CANDIDATURES.BY_ID(candidature._id), {
                ...candidature,
                statut: newStatus
            });
            
            // Rafraîchir la page pour voir les changements
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la modification du statut:", error);
        }
        setShowStatusMenu(false);
    };
    
    return(
        <div className="Table-Lign">
            <div className="Cell-g" data-content={candidature.entreprise}>{candidature.entreprise}</div>
            <div className="Cell-g">{getStatusComponent(candidature.statut)}</div>
            <div className="Cell-g" data-content={candidature.poste}>{candidature.poste}</div>
            <div className="Cell-g" data-content={candidature.lienOffre}>
                <a href={candidature.lienOffre} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                    Voir l'offre
                </a>
            </div>
            <div className="Cell-g">
                {new Date(candidature.dateCandidature).toLocaleDateString('fr-FR')}
            </div>
            <div className="Cell-end-g">
                <div className="icon" onClick={() => setShowStatusMenu(!showStatusMenu)}>
                    <img src="../../static/icons/Edit.svg" alt="Edit" />
                </div>
                <div className="icon" onClick={() => onDelete(candidature._id)}>
                    <img src="../../static/icons/Delete.svg" alt="Delete" />
                </div>
                
                {showStatusMenu && (
                    <div className="status-menu">
                        <div className="status-menu-header">Modifier le statut</div>
                        <div 
                            className={`status-option ${candidature.statut === 'en_attente' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('en_attente')}
                        >
                            <div className="status-color pending"></div>
                            <span>En attente</span>
                        </div>
                        <div 
                            className={`status-option ${candidature.statut === 'accepté' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('accepté')}
                        >
                            <div className="status-color accepted"></div>
                            <span>Accepté</span>
                        </div>
                        <div 
                            className={`status-option ${candidature.statut === 'refusé' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('refusé')}
                        >
                            <div className="status-color rejected"></div>
                            <span>Refusé</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LigneGrey