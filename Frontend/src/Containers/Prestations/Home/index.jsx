import "./style.scss";
import { useEffect, useRef, useState } from "react"
import CarouselIndicator from "@Components/CarouselIndicator";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function PrestationsHome({prestationsPhotos}){
    
    // reference du slider
    const sliderRef = useRef()

    // Paramètre du slider
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
    
    // Listen des prestations
    const [prestationsState, setPrestationsState] = useState(prestationsPhotos)
    // Prestation en cours de visualisation
    const [selectedPrestation, setSelectedPrestation] = useState(prestationsPhotos[0])

    // Quand une prestation devient selected, on set cette prestation dans selectedPrestation
    useEffect(() => {
        setSelectedPrestation(prestationsPhotos.find(element => element.selected === true))
    }, [prestationsState])

    // Quand l'utilisateur clique sur le nom d'une prestation, modifie en conséquence la liste des prestations et le statut selected et fait se déplacer le slider
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
                    <div className="slider-container">
                        <Slider ref={sliderRef} {...sliderSettings}>
                            {prestationsState.map((element, index) => (
                            <div key={index}>
                                <img loading="eager" src={element.img} alt={`Photo de présentation de la prestation ${element.label}`} />
                            </div>
                            ))}
                        </Slider>
                        <CarouselIndicator array={prestationsState}/>

                    </div>

            </div>
        </>
    )
}