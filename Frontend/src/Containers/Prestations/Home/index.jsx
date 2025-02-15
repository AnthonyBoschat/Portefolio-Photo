import "./style.scss";
import { useState } from "react"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "@Components/Carousel";



export default function PrestationsHome({prestationsPhotos}){
    
    
    // Listen des prestations
    const [photos, setPhotos] = useState(prestationsPhotos)

    // Quand l'utilisateur clique sur le nom d'une prestation, modifie en conséquence la liste des prestations et le statut selected et fait se déplacer le slider
    const switchPhoto = (index) => {
        setPhotos(photos.map((photo, photoIndex) => ({...photo, selected : photoIndex === index})))
    }
    

    return(
        <>
            <div className="buttons">
                {photos.map((element, index) => (
                    <button key={index} onClick={() => switchPhoto(index)} className={`${element.selected ? "focus" : ""}`}>{element.label}</button>
                ))}
            </div>
            <div id="picture-container">
                <Carousel photos={photos} setPhotos={setPhotos}/>
            </div>
        </>
    )
}