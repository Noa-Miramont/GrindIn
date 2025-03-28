import React from "react"
import '../style/PageNouvelleCandidature.css'

function PageNouvelleCandidature(){

    return(

        <div>
            <div className="Header">
                <img src="../../static/Logo.svg" />
            </div>
            <div className="Main">
                <div>
                    <h1 className="Title">Ajouter une candidature</h1>
                    <div className="Form">
                        <form>
                            <ul>
                                <li>
                                    <input 
                                        className="Text-Input" 
                                        type="text" 
                                        name="entreprise" 
                                        id="entreprise" 
                                        placeholder="Nom de l'entreprise..."
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
                                        required
                                    />
                                </li>

                                <li>
                                    <input 
                                        className="Text-Input" 
                                        type="url" 
                                        name="Lien" 
                                        id="Lien" 
                                        placeholder="Lien vers l'offre..."
                                        required
                                    />
                                </li>

                                <li>
                                    <input 
                                        className="Date-Input" 
                                        type="date" 
                                        name="date_publication" 
                                        id="date_publication" 
                                        placeholder="Date de publication de l'offre..."
                                        required
                                    />
                                </li>

                                <li>
                                    <input 
                                        className="Date-Input" 
                                        type="date" 
                                        name="date_candidature" 
                                        id="date_candidature" 
                                        placeholder="Date de candidature..."
                                        required
                                    />
                                </li>
                                <div className="Submit-Container">
                                    <input className="Submit-Button" type="submit" value="ajouter ma candidature" />
                                </div>
                            </ul>
                        </form>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNouvelleCandidature