import { useEffect, useRef } from "react";
import "./style.scss";
import Slider from "react-slick";
import CarouselIndicator from "@Components/CarouselIndicator";
import { useSelector } from "react-redux";


export default function Carousel({photos, setPhotos, infinite=false}){

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
        if(sliderRef && photos){
            const photoCurrentlyVisibleIndex = photos.findIndex(photo => photo.selected)
            sliderRef.current.slickGoTo(photoCurrentlyVisibleIndex === -1 ? 0 : photoCurrentlyVisibleIndex)
        }
    }, [photos, sliderRef])

    // Réinitialise le slider à la première slide quand currentRoute change
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
        }
    }, [currentRoute, sliderRef]);

    return(
        <div className="slider-container">
            <Slider ref={sliderRef} {...sliderSettings}>
                {photos.map((element, index) => (
                <div style={{height:"20rem"}} key={index}>
                    {/* <LazyImage src={element.image} alt={`Photo de présentation de la prestation ${element.label}`}/> */}
                    <img src={element.image} alt={`Photo de présentation de la prestation ${element.label}`} />
                </div>
                ))}
            </Slider>
            <CarouselIndicator array={photos}/>

        </div>
    )
}