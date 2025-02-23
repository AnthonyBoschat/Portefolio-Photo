// import "./style.scss";

import LazyImage from "@Components/LazyImage";

export default function Galery({photos, alt}){



    return(
        <>
            {photos.map((photo, index) => (
                <picture className={photo.orientation} key={index}>
                    <LazyImage src={photo.image} alt={alt}/>
                </picture>
            ))}
            
        </>
    )
}