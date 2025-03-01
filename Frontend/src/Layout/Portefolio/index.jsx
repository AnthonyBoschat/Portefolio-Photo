import "./style.scss";

import Galery from "@Components/Galery";

export default function PortefolioLayout({photos, portefolioType}){



    return(
        <div id="portefolios-main-container">
            <Galery photos={photos} alt={`Photo de la categorie portefolio '${portefolioType}'`} />
        </div>
    )
}