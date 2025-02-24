// import "./style.scss";

import LazyImage from "@Components/LazyImage";
import { useSelector } from "react-redux";

export default function Galery({photos, alt}){

    const {mobile} = useSelector(store => store.app)

    return(
        <>
            {photos.map((photo, index) => (
                <picture className={photo.orientation} key={index}>
                    <LazyImage src={photo.image ? photo.image : photo} alt={alt}/>
                </picture>
            ))}
            
        </>
    )
}