import "./style.scss";
import ROUTES from "@Constants/Routes"
import { useEffect, useMemo, useRef, useState } from "react"
import BoudoirPhoto from "@Assets/Photos/Home/Prestations/Boudoir.jpg"
import ArtisanPhoto from "@Assets/Photos/Home/Prestations/Artisan.jpg"
import PortraitPhoto from "@Assets/Photos/Home/Prestations/Portrait.jpg"
import CarouselIndicator from "@Components/CarouselIndicator";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function PrestationsHome(){
    
    const sliderRef = useRef()
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        lazyLoad: false,
        beforeChange: (current, next) => {
            setPrestationsState(current => current.map((photo, index) => ({...photo, selected: index === next})))
        }
      };

    const initialPrestationsState = useMemo(() => ([
        {label:"Boudoir", selected:true, link:ROUTES.PRESTATIONS.BOUDOIR, img:BoudoirPhoto},
        {label:"Portrait", selected:false, link:ROUTES.PRESTATIONS.PORTRAIT, img:PortraitPhoto},
        {label:"Artisan", selected:false, link:ROUTES.PRESTATIONS.BOUDOIR, img:ArtisanPhoto},
    ]), [])
    const [prestationsState, setPrestationsState] = useState(initialPrestationsState)
    const [selectedPrestation, setSelectedPrestation] = useState(prestationsState[0])

    useEffect(() => {
        setSelectedPrestation(prestationsState.find(element => element.selected === true))
    }, [prestationsState])

    const switchPrestationPhoto = (userChoicePrestation, index) => {
        if(!userChoicePrestation !== selectedPrestation){
            const newPrestations = [...prestationsState].map(element => {
                element.selected = (userChoicePrestation.label === element.label)
                return element
            })
            setPrestationsState(newPrestations)
        }
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    }

    return(
        <>
            <div className="buttons">
                {prestationsState.map((element, index) => (
                    <button key={index} onClick={() => switchPrestationPhoto(element, index)} className={`${element.selected ? "focus" : ""}`}>{element.label}</button>
                ))}
            </div>
            <div id="picture-container">

                    <Slider ref={sliderRef} {...sliderSettings}>
                        {prestationsState.map((element, index) => (
                        <div key={index}>
                            <img loading="eager" src={element.img} alt={`Photo de présentation de la prestation ${element.label}`} />
                        </div>
                        ))}
                    </Slider>
                    <CarouselIndicator array={prestationsState} condition={(element) => element.selected }/>

            </div>
        </>
    )
}