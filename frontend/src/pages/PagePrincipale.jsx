import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import CandidaturesList from "../component/CandidaturesList.jsx"
import { API_URL } from "../config/api"
import '../style/PagePrincipal.css'

function PagePrincipal(){
    const [filter, setFilter] = useState("all");
    const [stats, setStats] = useState({
        global: { totalCandidatures: 0 },
        byStatus: []
    });
    const [loading, setLoading] = useState(true);
    
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [globalStats, statusStats] = await Promise.all([
                    axios.get(`${API_URL.BASE}/stats/global`),
                    axios.get(`${API_URL.BASE}/stats/par-statut`)
                ]);
                
                setStats({
                    global: globalStats.data,
                    byStatus: statusStats.data
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchStats();
    }, []);

    return(
        <div>
            <div className="Header-Container">
                <img src="../../static/Logo.svg" alt="Logo" />
            </div>
            <div className="Main">
                {/* Section Statistiques */}
                <div className="Container Stats-Container">
                    <h2 className="Title">Statistiques</h2>
                    <div className="Stats-Cards-Container">
                        <div className="Stats-Card">
                            <h3>Total des candidatures</h3>
                            <p className="Stats-Number">{stats.global.totalCandidatures}</p>
                        </div>
                        
                        <div className="Stats-Card">
                            <h3>Par statut</h3>
                            <div className="Stats-Status-Container">
                                {stats.byStatus.map(stat => (
                                    <div key={stat._id || "inconnu"} className="Stats-Status-Item">
                                        <span className={`Stats-Status-Badge ${stat._id}`}>
                                            {stat._id === "accepté" ? "Acceptées" : 
                                             stat._id === "refusé" ? "Refusées" :
                                             stat._id === "en_attente" ? "En attente" : stat._id}
                                        </span>
                                        <span className="Stats-Status-Count">{stat.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Liste des candidatures */}
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