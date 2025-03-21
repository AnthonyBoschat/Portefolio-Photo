// import "./style.scss";

import LazyImage from "@Components/LazyImage";
import { setZoomPhoto } from "@Redux/Slices/zoom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Galery({photos, alt}){

    const dispatch = useDispatch()

    const zoomPhoto = (collection, photoIndex) => {
        dispatch(setZoomPhoto({collection:collection, photoIndex:photoIndex}))
    }

    useEffect(() => {
        if(photos){
            console.log("debug photos[0]", photos[0])
        }
    }, [photos])

    return(
        <>
            {photos.map((photo, index) => (
                <picture onClick={() => zoomPhoto(photos, index)} className={photo.orientation} key={index}>
                    <LazyImage src={photo.image ? photo.image : photo} alt={alt}/>
                </picture>
            ))}
            
        </>
    )
}