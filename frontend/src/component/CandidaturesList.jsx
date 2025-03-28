import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusGreen from "./Status-Green";
import StatusRed from "./Status-Red";
import StatusOrange from "./Status-Orange";
import { API_URL } from "../config/api";
import LigneBlack from "./Ligne-Black";
import LigneGrey from "./Ligne-Grey";
import "../style/CandidaturesList.css";

function CandidaturesList({ filterStatus = "all" }) {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                let url;
                if (filterStatus === "all") {
                    url = API_URL.CANDIDATURES.BASE;
                } else {
                    url = API_URL.CANDIDATURES.WITH_FILTERS({ statut: filterStatus });
                }
                
                const response = await axios.get(url);
                setCandidatures(response.data);
            } catch (error) {
                console.error("Error fetching candidatures:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidatures();
    }, [filterStatus]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(API_URL.CANDIDATURES.BY_ID(id));
            setCandidatures(candidatures.filter(candidature => candidature._id !== id));
        } catch (error) {
            console.error("Error deleting candidature:", error);
        }
    };

    const getStatusComponent = (status) => {
        switch (status) {
            case "accepté":
                return <StatusGreen />;
            case "refusé":
                return <StatusRed />;
            case "en_attente":
                return <StatusOrange />;
            default:
                return <StatusOrange />;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (candidatures.length === 0) {
        return <div className="candidatures-empty">Aucune candidature trouvée</div>;
    }

    return (
        <div className="candidatures-list" style={{ display: "block", lineHeight: 0 }}>
            {candidatures.map((candidature, index) => 
                index % 2 === 0 ? (
                    <LigneBlack 
                        key={candidature._id}
                        candidature={candidature}
                        getStatusComponent={getStatusComponent}
                        onDelete={handleDelete}
                    />
                ) : (
                    <LigneGrey
                        key={candidature._id}
                        candidature={candidature}
                        getStatusComponent={getStatusComponent}
                        onDelete={handleDelete}
                    />
                )
            )}
        </div>
    );
}

export default CandidaturesList; 