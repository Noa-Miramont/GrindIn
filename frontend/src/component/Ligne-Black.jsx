import React from "react"
import StatusGreen from '../component/Status-Green'
import StatusRed from '../component/Status-Red'
import '../style/Ligne-Black.css'

function LigneBlack(){
    return(
        <div className="Table-Lign">
            <div className="Cell">Entreprise</div>
            <div className="Cell"><StatusGreen/></div>
            <div className="Cell">Poste</div>
            <div className="Cell">Lien de l'offre</div>
            <div className="Cell">Date d’envoi</div>
            <div className="Cell-end">
                <div className="icon"> <img src="../../static/icons/Edit.svg" /></div>
                <div className="icon"> <img src="../../static/icons/Delete.svg" /></div>
            </div>
        </div>
    )
}

export default LigneBlack