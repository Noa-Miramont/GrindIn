import React from "react"
import { Link, useNavigate } from "react-router-dom"
import LigneBlack from "../component/Ligne-Black.jsx"
import LigneGrey from "../component/Ligne-Grey.jsx"

import '../style/PagePrincipal.css'

function PagePrincipal(){
    return(
        <div>
            <div className="Header-Container">
                <img src="../../static/Logo.svg" />
            </div>
            <div className="Main">
                <div className="Container">
                    <h2 className="Title">Liste des candidatures</h2>
                    <div className="Table-Container">
                        <div className="Table-Header">
                            <div className="Cell-Header">Entreprise</div>
                            <div className="Cell-Header">Statut</div>
                            <div className="Cell-Header">Poste</div>
                            <div className="Cell-Header">Lien de l'offre</div>
                            <div className="Cell-Header">Date d’envoi</div>
                            <div className="Cell-Header-end"></div>
                        </div>
                        <LigneBlack/>
                        <LigneGrey/>
                        <LigneBlack/>
                        <LigneGrey/>
                        <LigneBlack/>
                        <LigneGrey/>
                        <LigneBlack/>
                        <LigneGrey/>      
                    </div>
            
                    <div className="New-Button-Container">
                        <Link className="New-Button" to="/Nouvelle-Candidature">
                            <img src="../../static/icons/Add.svg" />
                            <h2 className="Text-Button">New</h2>
                        </Link>
                    </div>
                </div>
                
            </div>
         </div>
    )
}

export default PagePrincipal