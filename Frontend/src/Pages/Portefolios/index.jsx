import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ROUTES from "@Constants/Routes";
import ENDPOINT from "@Constants/Endpoint";
import { useLocation, useParams } from "react-router-dom";
import sortByPhotoType from "@Services/sortByPhotoType";
import PortefolioLayout from "@Layout/Portefolio";

export default function PortefoliosPage() {
  const location = useLocation()
  const currentRoute = location.pathname
  const { artisanID } = useParams()
  const [photos, setPhotos] = useState([]);
  const [portefolioType, setPortefolioType] = useState(null)

  useEffect(() => {


    // Si le chargement de cette page concerne des artisans
    if(currentRoute.startsWith("/Artisan") && artisanID){
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
          case ROUTES.PORTEFOLIOS.RETOUCHE_CREATIVE:
            subject="po_retoucheCreatives"
            portefolioType = "Retouche Créative"
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
    <PortefolioLayout photos={photos} portefolioType={portefolioType} />
  );
}