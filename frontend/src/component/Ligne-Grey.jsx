import React from "react"
import StatusGreen from '../component/Status-Green'
import StatusRed from '../component/Status-Red'
import StatusOrange from '../component/Status-Orange'
import '../style/Ligne-Grey.css'

function LigneGrey(){
    return(
        <div className="Table-Lign">
            <div className="Cell-g">Entreprise</div>
            <div className="Cell-g">Statut</div>
            <div className="Cell-g">Poste</div>
            <div className="Cell-g">Lien de l'offre</div>
            <div className="Cell-g">Date d’envoi</div>
            <div className="Cell-end-g">
                <div className="icon"> <img src="../../static/icons/Edit.svg" /></div>
                <div className="icon"> <img src="../../static/icons/Delete.svg" /></div>
            </div>
        </div>
    )
}

export default LigneGrey