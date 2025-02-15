import { useEffect, useRef } from "react";
import "./style.scss";
import Slider from "react-slick";
import CarouselIndicator from "@Components/CarouselIndicator";
import { useSelector } from "react-redux";


export default function Slide({photos, setPhotos, infinite=false}){

    const currentRoute = useSelector(store => store.routes.currentRoute)

    const sliderRef = useRef()

    const sliderSettings = {
        dots: false,
        infinite: infinite && photos.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        lazyLoad: false,
        beforeChange: (current, next) => {
            setPhotos(current => current.map((photo, index) => ({...photo, selected: index === next})))
        }
    };

    // Si une photo devient selected en dehors du comportement du slider, place le slider sur celle-ci
    useEffect(() => {
        if(sliderRef){
            const photoCurrentlyVisibleIndex = photos.findIndex(photo => photo.selected)
            sliderRef.current.slickGoTo(photoCurrentlyVisibleIndex)
        }
    }, [photos])

    // Réinitialise le slider à la première slide quand currentRoute change
    useEffect(() => {
        if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
        }
    }, [currentRoute]);

    return(
        <div className="slider-container">
            <Slider ref={sliderRef} {...sliderSettings}>
                {photos.map((element, index) => (
                <div key={index}>
                    <img loading="eager" src={element.image} alt={`Photo de présentation de la prestation ${element.label}`} />
                </div>
                ))}
            </Slider>
            <CarouselIndicator array={photos}/>

        </div>
    )
}