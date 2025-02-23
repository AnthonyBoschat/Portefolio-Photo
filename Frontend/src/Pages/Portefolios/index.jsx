import { useEffect, useState } from "react";
import './style.scss';
import { useSelector } from "react-redux";
import ROUTES from "@Constants/Routes";
import ENDPOINT from "@Constants/Endpoint";
import { useParams } from "react-router-dom";
import Galery from "@Components/Galery";
import sortByPhotoType from "@Services/sortByPhotoType";

export default function PortefoliosPage() {

  const currentRoute = useSelector(store => store.routes.currentRoute)
  const { artisanID } = useParams()
  const [photos, setPhotos] = useState([]);
  const [portefolioType, setPortefolioType] = useState(null)

  useEffect(() => {

    // Si le chargement de cette page concerne des artisans
    if(currentRoute.startsWith("/Artisan") && artisanID){
      console.log(artisanID)
      fetch(ENDPOINT.getThisArtisanPhoto(artisanID))
      .then(response => response.json())
      .then(photos => {
        const sortedPhotos = sortByPhotoType(photos)
        setPhotos(sortedPhotos.map(photo => ({image:photo.image, orientation:photo.orientation})))
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
          .then(photos => {
            const sortedPhotos = sortByPhotoType(photos)
            const photosArray = sortedPhotos.map(photo => ({image:photo.image, orientation:photo.orientation}))
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