import React, { useState } from "react"
import { Link } from "react-router-dom"
import CandidaturesList from "../component/CandidaturesList.jsx"
import '../style/PagePrincipal.css'

function PagePrincipal(){
    const [filter, setFilter] = useState("all");
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return(
        <div>
            <div className="Header-Container">
                <img src="../../static/Logo.svg" alt="Logo" />
            </div>
            <div className="Main">
                <div className="Container">
                    <h2 className="Title">Liste des candidatures</h2>
                    <div className="Filter-Container">
                        <button 
                            className={`Filter-Button ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('all')}
                        >
                            Toutes
                        </button>
                        <button 
                            className={`Filter-Button ${filter === 'accepté' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('accepté')}
                        >
                            Acceptées
                        </button>
                        <button 
                            className={`Filter-Button ${filter === 'en_attente' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('en_attente')}
                        >
                            En attente
                        </button>
                        <button 
                            className={`Filter-Button ${filter === 'refusé' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('refusé')}
                        >
                            Refusées
                        </button>
                        <button 
                            className={`Filter-Button ${filter === 'relances' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('relances')}
                        >
                            Relances ({'>'}1 semaine)
                        </button>
                    </div>
                    <div className="Table-Container">
                        <div className="Table-Header">
                            <div className="Cell-Header">Entreprise</div>
                            <div className="Cell-Header">Statut</div>
                            <div className="Cell-Header">Poste</div>
                            <div className="Cell-Header">Lien de l'offre</div>
                            <div className="Cell-Header">Date d'envoi</div>
                            <div className="Cell-Header-end"></div>
                        </div>
                        <CandidaturesList filterStatus={filter} />
                    </div>
            
                    <div className="New-Button-Container">
                        <Link className="New-Button" to="/Nouvelle-Candidature">
                            <img src="../../static/icons/Add.svg" alt="Add" />
                            <h2 className="Text-Button">New</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagePrincipal