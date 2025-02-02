import "./style.scss";
import RoussePhoto from "@Assets/Photos/Home/Portefolio/Rousse.jpg"
import HommePhoto from "@Assets/Photos/Home/Portefolio/Homme.jpg"
import GrillePhoto from "@Assets/Photos/Home/Portefolio/Grille.jpg"

export default function PortefoliosHome(){

    const portefolioPhotos = [
        HommePhoto,
        RoussePhoto,
        GrillePhoto,
    ]

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