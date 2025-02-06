import { useMemo } from "react";
import "./style.scss";
import photo from "@Assets/Photos/Home/aPropos/Jesahel.jpg"


export default function AProposHome(){

    const JesahelPhoto = useMemo(() => photo, [])

    return(
        <div className="presentation">
            <picture>
                <img src={JesahelPhoto} alt="" />
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