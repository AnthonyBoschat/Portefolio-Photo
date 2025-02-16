import "./style.scss";

import cameraIcon from "@Assets/icons/camera.svg";
import clockIcon from "@Assets/icons/clock.svg";
import dollarsIcon from "@Assets/icons/dollars.svg";
import ROUTES from "@Constants/Routes";
import ExploreButton from "@Components/ExploreButton";
import Carousel from "@Components/Carousel";
import LazyImage from "@Components/LazyImage";


export default function PrestationsLayout({
    description,
    informations,
    galeryPhotos, 
    setGaleryPhotos, 
    bannerPhotos, 
    currentRoute,
}){


    console.log(galeryPhotos)
    


    return(
        <div id="prestations-main-container">
            

            {/* Première section */}
            <div className="photos_presentation-details-container">
                <ul className="photos_presentation">
                    {bannerPhotos.map((photo, index) => (
                        <li key={index}>
                            <LazyImage src={photo} alt={"Photo bannière de présentation de la préstation"}/>
                            {/* <img src={photo} alt="" /> */}
                        </li>
                    ))}
                </ul>
                <ul className="details-container">
                    <li>
                        <img src={cameraIcon} alt="" />
                        <span>{informations?.photosProvide} photos retouchées</span>
                    </li>
                    <li>
                        <img src={clockIcon} alt="" />
                        {informations?.duration?.length === 1 
                            ? <span>{informations?.duration?.[0]} heure{informations?.duration?.[0] !== 1 && "s"} de prises de vue</span>
                            : <span>{informations?.duration?.[0]} à {informations?.duration?.[1]} heures de prises de vue</span>
                        }
                    </li>   
                    <li>
                        <img src={dollarsIcon} alt="" />
                        <span>À partir de {informations?.price} dollars</span>
                    </li>
                </ul>
            </div>



            {/* Deuxième section */}
            <div className="prestation-description-container">
                <p>
                    {description.map((sentence, index) => (
                        <span key={index}>{sentence}</span>
                    ))}
                </p>
            </div>
            <ExploreButton navigate={ROUTES.CONTACT} text={"Contact"}/>







            {/* Troisième section */}

            {currentRoute === ROUTES.PRESTATIONS.ARTISAN 
                // Quand c'est la prestation artisan 
                ? (
                    <div className="artisan-photos-container">
                        {galeryPhotos.map((element, index) => (
                            <div key={index} className={`picture ${(index % 3 === 2 )? "paysage" : "portrait"}`}>
                                    <span>{element.artisans[0].name}</span>
                                    <picture>
                                        <img src={element.image} alt="" />
                                    </picture>
                            </div>
                        ))}
                    </div>
                )
                
                
                // Quand c'est une autre prestation
                : (
                    <div className="photos-carousel-container">
                        <Carousel infinite photos={galeryPhotos} setPhotos={setGaleryPhotos}/>
                    </div>
                )}
            




        </div>
    )
}