import "./style.scss";
import { useState } from "react"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "@Components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "@Components/LazyImage";
import ExploreButton from "@Components/ExploreButton";
import { openSubMenuForce } from "@Redux/Slices/routes";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { useNavigate } from "react-router-dom";



export default function PrestationsHome({prestationsPhotos}){
    
    const {desktop, mobile} = useSelector(store => store.app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // Liste des prestations
    const [photos, setPhotos] = useState(prestationsPhotos)

    // Quand l'utilisateur clique sur le nom d'une prestation, modifie en conséquence la liste des prestations et le statut selected et fait se déplacer le slider
    const switchPhoto = (index) => {
        setPhotos(photos.map((photo, photoIndex) => ({...photo, selected : photoIndex === index})))
    }
    

    return(
        <>
            {mobile && (
                <div id="mobile">
                    <div className="buttons">
                        {photos.map((element, index) => (
                            <button key={index} onClick={() => switchPhoto(index)} className={`${element.selected ? "focus" : ""}`}>{element.label}</button>
                        ))}
                    </div>
                    <div id="picture-container">
                        <Carousel photos={photos} setPhotos={setPhotos}/>
                    </div>
                    <ExploreButton onClick={() => {
                        dispatch(openSubMenuForce("Prestations"))
                        dispatch(setOpenPhoneMenu(true))
                    }} text={"En savoir plus"}/>
                </div>
            )}
            {desktop && (
                <div id="desktop">
                    {photos.map((photo, index) => (
                        <div key={index} className="prestation">
                            <div className="label">{photo.label}</div>
                            <LazyImage src={photo.image} onClick={() => navigate(photo.url)} />
                        </div>
                    ) )}
                </div>
            )}
        </>
    )
}