import LazyImage from "@Components/LazyImage";
import "./style.scss";


export default function AProposHome({aproposPhoto}){


    return(
        <div className="presentation">
            <picture>
                <LazyImage src={aproposPhoto} alt={"Photo de Jesahel Charpentier"}/>
                {/* <img src={aproposPhoto} alt="" /> */}
            </picture>
            <p className="presentation">
                <span className="long">
                    <span>
                        Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile. 
                    </span>
                    <span>
                        Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.
                    </span>
                </span>
                <span className="end">
                    <span>
                        Je m'assure que chaque séance se ...
                    </span>
                </span>
            </p>
        </div>
            
    )
}