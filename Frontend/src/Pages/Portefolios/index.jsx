import { useEffect, useState } from "react";
import './style.scss';
import { useSelector } from "react-redux";
import ROUTES from "@Constants/Routes";

// const photos = import.meta.glob('./photos/studio/*.jpg', { eager: true });
const photos = import.meta.glob('./photos/low/*.webp', { eager: true });

export default function PortefoliosPage() {

  // const paths = Object.values(photos).map(module => module.default);
  // setPhotos(paths);

  const [photos, setPhotos] = useState([]);
  const currentRoute = useSelector(store => store.routes.currentRoute)


  useEffect(() => {
    
    let subject
    switch(currentRoute){

      case ROUTES.PORTEFOLIOS.STUDIO:
        subject="po_studio"
        break
      case ROUTES.PORTEFOLIOS.FANTASTIQUE:
        subject="po_fantastique"
        break
      
      default:
        
        return
    }
    fetch(`http://127.0.0.1:8000/api/photos?type=portefolio&subject=${subject}`)
    .then(response => response.json())
    .then(result => {
      setPhotos(result)
    })
  }, [currentRoute])

  return (
    <div id="portefolios-main-container">

        {photos.map((photo, index) => (
            <img loading="lazy" key={index} src={photo.image} alt={`Photo ${index}`} />
        ))}

    </div>
  );
}