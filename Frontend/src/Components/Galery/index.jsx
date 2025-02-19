// import "./style.scss";

import LazyImage from "@Components/LazyImage";

export default function Galery({photos, alt}){



    return(
        <>
            {photos.map((photo, index) => (
                <picture key={index}>
                    <LazyImage src={photo} alt={alt}/>
                </picture>
            ))}
            
        </>
    )
}