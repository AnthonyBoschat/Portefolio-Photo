import "./style.scss";

import cameraIcon from "@Assets/icons/camera.svg";
import clockIcon from "@Assets/icons/clock.svg";
import dollarsIcon from "@Assets/icons/dollars.svg";

import Slider from "react-slick";
import { useEffect, useRef } from "react";
import CarouselIndicator from "@Components/CarouselIndicator";
import ROUTES from "@Constants/Routes";
import ExploreButton from "@Components/ExploreButton";
import { useNavigate } from "react-router-dom";


export default function PrestationsLayout({
    descriptionPrestation,
    informationsPrestation,
    presentationPhotos, 
    setPresentationPhotos, 
    bannerPhotos, 
    currentRoute,
}){

    // Référence du slider
    const sliderRef = useRef()

    // Configuration du slider
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        lazyLoad: false,
        beforeChange: (current, next) => {
            setPresentationPhotos(current => current.map((photo, index) => ({...photo, selected: index === next})))
        },
    }

    // Réinitialise le slider à la première slide quand currentRoute change
    useEffect(() => {
        if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
        }
    }, [currentRoute]);


    return(
        <div id="prestations-main-container">
            

            {/* Première section */}
            <div className="photos_presentation-details-container">
                <ul className="photos_presentation">
                    {bannerPhotos.map((photo, index) => (
                        <li key={index}>
                            <img src={photo.img} alt="" />
                        </li>
                    ))}
                </ul>
                <ul className="details-container">
                    <li>
                        <img src={cameraIcon} alt="" />
                        <span>{informationsPrestation?.photosProvide} photos retouchées</span>
                    </li>
                    <li>
                        <img src={clockIcon} alt="" />
                        {informationsPrestation?.duration?.length === 1 
                            ? <span>{informationsPrestation?.duration?.[0]} heure{informationsPrestation?.duration?.[0] !== 1 && "s"} de prises de vue</span>
                            : <span>{informationsPrestation?.duration?.[0]} à {informationsPrestation?.duration?.[1]} heures de prises de vue</span>
                        }
                    </li>   
                    <li>
                        <img src={dollarsIcon} alt="" />
                        <span>À partir de {informationsPrestation?.price} dollars</span>
                    </li>
                </ul>
            </div>



            {/* Deuxième section */}
            <div className="prestation-description-container">
                <p>
                    {descriptionPrestation.map(sentence => (
                        <span>{sentence}</span>
                    ))}
                </p>
            </div>
            <ExploreButton navigate={ROUTES.CONTACT} text={"Contact"}/>







            {/* Troisième section */}
            {currentRoute === ROUTES.PRESTATIONS.ARTISAN 
                // Quand c'est la prestation artisan 
                ? (
                    <div className="artisan-photos-container">
                        {presentationPhotos.map((photo, index) => (
                            <div key={index} className={`picture ${photo.type}`}>
                                    <span>{photo.label}</span>
                                    <picture>
                                        <img src={photo.image} alt="" />
                                    </picture>
                            </div>
                        ))}
                    </div>
                )
                
                
                // Quand c'est une autre prestation
                : (
                    <div className="photos-carousel-container">
                        <div className="slider-container">
                            <Slider ref={sliderRef} {...sliderSettings}>
                                {presentationPhotos.map((photo, index) => (
                                    <div>
                                        <img src={photo.image} alt="" />
                                    </div>
                                ))}
                            </Slider>
                            <CarouselIndicator array={presentationPhotos} condition={(element) => element.selected} />
                        </div>
                    </div>
                )}
            




        </div>
    )
}