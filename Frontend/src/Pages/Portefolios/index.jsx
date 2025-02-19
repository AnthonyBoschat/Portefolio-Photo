import { useEffect, useState } from "react";
import './style.scss';
import { useSelector } from "react-redux";
import ROUTES from "@Constants/Routes";
import ENDPOINT from "@Constants/Endpoint";
import { useParams } from "react-router-dom";
import Galery from "@Components/Galery";

export default function PortefoliosPage() {

  const currentRoute = useSelector(store => store.routes.currentRoute)
  const {artisanID} = useParams()
  const [photos, setPhotos] = useState([]);
  const [portefolioType, setPortefolioType] = useState(null)

  useEffect(() => {
    console.log(currentRoute)
    // Si le chargement de cette page concerne des artisans
    if(currentRoute.startsWith("/Artisan") && artisanID){
      console.log(artisanID)
      fetch(ENDPOINT.getThisArtisanPhoto(artisanID))
      .then(response => response.json())
      .then(photos => {
        setPhotos(photos.map(photo => photo.image))
      })
    }
    
    // Si le chargement de cette page concerne des portefolios
    else{
        let portefolioType
        let subject
        switch(currentRoute){
    
          case ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE:
            subject="po_collaborationArtistique"
            portefolioType = "Collaboration Artistique"
            break
          case ROUTES.PORTEFOLIOS.FANTASTIQUE:
            subject="po_fantastique"
            portefolioType = "Fantastique"
            break
          case ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE:
            subject="po_lumiereNaturelle"
            portefolioType = "Lumière Naturelle"
            break
          case ROUTES.PORTEFOLIOS.NU_LINGERIE:
            subject="po_nuLingerie"
            portefolioType = "Nu - Lingerie"
            break
          case ROUTES.PORTEFOLIOS.STUDIO:
            subject="po_studio"
            portefolioType = "Studio"
            break
          default:
            return
        }
        if(subject && portefolioType){
          setPortefolioType(portefolioType)
          fetch(ENDPOINT.LOAD("portefolio", subject))
          .then(response => response.json())
          .then(result => {
            const photosArray = result.map(photo => photo.image)
            setPhotos(photosArray)
          })
        }
    }
  }, [currentRoute])


  return (
    <div id="portefolios-main-container">
        
        <Galery photos={photos} alt={`Photo de la categorie portefolio '${portefolioType}'`} />
    </div>
  );
}