import "./style.scss";
import { useEffect, useState } from "react"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Carousel from "@Components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "@Components/LazyImage";
import ExploreButton from "@Components/ExploreButton";
import { openSubMenuForce } from "@Redux/Slices/routes";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { Link, useNavigate } from "react-router-dom";
import Galery from "@Components/Galery";

    // useEffect(() => {
    //     setPhotos(representantsPhotos)
    // }, [representantsPhotos])

export default function PrestationsHome({representantsPhotos, ready}){
    
    const {desktop, mobile}     = useSelector(store => store.app)
    const dispatch              = useDispatch()
    
    // Liste des prestations
    const [photos, setPhotos]   = useState(representantsPhotos || [])

    useEffect(() => {
        if(ready){
            setPhotos(representantsPhotos)
        }
    }, [ready])

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
                    <ExploreButton position="center" onClick={() => {
                        dispatch(openSubMenuForce("Prestations"))
                        dispatch(setOpenPhoneMenu(true))
                    }} text={"En savoir plus"}/>
                </div>
            )}
            {desktop && (
                <Galery 
                    id="desktop"
                    elements={photos} 
                    hoverEffect
                    render={(photo) => (
                        <>
                            <div className="label">{photo.label}</div>
                            <Link to={photo.link || photo.url}>
                                <picture className="photo-container">
                                    <img src={photo.image} alt={`Photo représentative de la prestation ${photo.label}`} />
                                </picture>
                            </Link>
                        </>
                    )}
                />
            )}
        </>
    )
}