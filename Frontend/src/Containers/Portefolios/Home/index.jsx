import "./style.scss";
import Photo1 from "@Assets/Photos/Home/Portefolio/1.jpg"
import Photo2 from "@Assets/Photos/Home/Portefolio/2.jpg"
import Photo3 from "@Assets/Photos/Home/Portefolio/3.jpg"
import { useMemo } from "react";

export default function PortefoliosHome(){

    const portefolioPhotos = useMemo(() => ([
        Photo3,
        Photo1,
        Photo2,
    ]), [])

    return(
        <>
            {portefolioPhotos.map((photo, index) => (
                <picture key={index}>
                    <img src={photo} alt="Photo de présentation de la catégorie 'Portefolio'" />
                </picture>
            ))}
            
        </>
    )
}