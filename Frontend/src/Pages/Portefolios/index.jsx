import { useEffect, useState } from "react";
import './style.scss';
import { useSelector } from "react-redux";
import ROUTES from "@Constants/Routes";
import ENDPOINT from "@Constants/Endpoint";
import LazyImage from "@Components/LazyImage";

export default function PortefoliosPage() {

  const [photos, setPhotos] = useState([]);
  const currentRoute = useSelector(store => store.routes.currentRoute)


  useEffect(() => {
    let subject
    switch(currentRoute){

      case ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE:
        subject="po_collaborationArtistique"
        break
      case ROUTES.PORTEFOLIOS.FANTASTIQUE:
        subject="po_fantastique"
        break
      case ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE:
        subject="po_lumiereNaturelle"
        break
      case ROUTES.PORTEFOLIOS.NU_LINGERIE:
        subject="po_nuLingerie"
        break
      case ROUTES.PORTEFOLIOS.STUDIO:
        subject="po_studio"
        break
      
      default:
        return
    }
    fetch(ENDPOINT.LOAD("portefolio", subject))
    .then(response => response.json())
    .then(result => {
      setPhotos(result)
    })
  }, [currentRoute])


  return (
    <div id="portefolios-main-container">

        {photos.map((photo, index) => (
            // <img
            //   key={index} 
            //   src={photo.image}
            //   loading="lazy" 
            //   alt={`Photo ${index}`} 
            // />
            <LazyImage key={photo.image} src={photo.image}/>
        ))}

    </div>
  );
}