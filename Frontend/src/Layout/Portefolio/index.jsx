import usePhoto from "@Services/usePhoto";
import "./style.scss";

import Galery from "@Components/Galery";
import LazyImage from "@Components/LazyImage";

export default function PortefolioLayout({collection, portefolioName}){

    const {zoomPhoto} = usePhoto()


    return( 
        <>
        
            <Galery 
                id="portefolios-main-container"
                elements={collection} 
                hoverEffect
                render={(photo, index) => (
                    <LazyImage onClick={() => zoomPhoto(collection, index)} src={photo.image ? photo.image : photo} alt={`Photo de la categorie portefolio '${portefolioName}'`}/>
                )}
            />
        </>
        
    )
}