import "./style.scss";
import photo1 from "./photos/1.jpg";
import photo2 from "./photos/2.jpg";
import photo3 from "./photos/3.jpg";
import photo4 from "./photos/4.jpg";
import cameraIcon from "@Assets/icons/camera.svg";
import clockIcon from "@Assets/icons/clock.svg";
import dollarsIcon from "@Assets/icons/dollars.svg";

import carous1 from "./photos/carousel/1.jpg";
import carous2 from "./photos/carousel/2.jpg";
import carous3 from "./photos/carousel/3.jpg";
import carous4 from "./photos/carousel/4.jpg";
import carous5 from "./photos/carousel/5.jpg";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import CarouselIndicator from "@Components/CarouselIndicator";


const response = {
    banner:[
        {img:photo1, type:"portrait"},
        {img:photo2, type:"portrait"},
        {img:photo3, type:"portrait"},
    ],
    presentation:[
        {img:carous1, type:"portrait"},
        {img:carous2, type:"portrait"},
        {img:carous3, type:"paysage"},
        {img:carous4, type:"portrait"},
        {img:carous5, type:"paysage"},
    ]
}

export default function PrestationsLayout(){

    // Contient les photo de bannière
    const [bannerPhotos, setBannerPhotos] = useState([])
    // Contient les photos de présentation
    const [presentations, setPresentationPhotos] = useState([])

    // Charge dans le state les photos de la réponse
    useEffect(() => {
        if(response){
            const presentationPhotos = response.presentation.map((photo, index) => ({...photo, selected: index === 0}))
            const bannerPhotos = response.banner
            setPresentationPhotos(presentationPhotos)
            setBannerPhotos(bannerPhotos)
        }
    }, [])
    

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
        }
    }


    return(
        <div id="prestations-main-container">
            

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
                        <span>10 photos retouchées</span>
                    </li>
                    <li>
                        <img src={clockIcon} alt="" />
                        <span>3 à 4 heures de prises de vue</span>
                    </li>   
                    <li>
                        <img src={dollarsIcon} alt="" />
                        <span>À partir de 295 dollars</span>
                    </li>
                </ul>
            </div>


            <div className="prestation-description-container">
                <p>
                    <span>Mettez en lumière votre savoir-faire, votre atelier ou un moment clé de votre activité. </span>
                    <span>Cette formule flexible est parfaite pour refléter votre univers professionnel. </span>
                    <span>Des options comme le maquillage ou la location d’un lieu peuvent être ajoutées en supplément.</span>
                </p>
            </div>


            <div className="photos-carousel-container">
                <Slider ref={sliderRef} {...sliderSettings}>
                    {presentations.map((photo, index) => (
                        <div>
                            <img src={photo.img} alt="" />
                        </div>
                    ))}
                </Slider>
                <CarouselIndicator array={presentations} condition={(element) => element.selected} />
            </div>




        </div>
    )
}