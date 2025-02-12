import "./style.scss";

export default function PortefoliosHome({portefolioPhotos}){

    

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