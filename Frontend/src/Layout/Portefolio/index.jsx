import usePhoto from "@Services/usePhoto";
import "./style.scss";

import Galery from "@Components/Galery";
import LazyImage from "@Components/LazyImage";
import Footer from "@Containers/Footer";

export default function PortefolioLayout({photos, portefolioType}){

    const {zoomPhoto} = usePhoto()

    return( 
        <>
        
            <Galery 
                id="portefolios-main-container"
                elements={photos} 
                hoverEffect
                render={(photo, index) => (
                    <LazyImage onClick={() => zoomPhoto(photos, index)} src={photo.image ? photo.image : photo} alt={`Photo de la categorie portefolio '${portefolioType}'`}/>
                )}
                />
            <Footer/>
        </>
        
    )
}