import "./style.scss";
import ROUTES from "@Constants/Routes"
import { useEffect, useState } from "react"
import BoudoirPhoto from "@Assets/Photos/Home/Prestations/Boudoir.jpg"
import ArtisanPhoto from "@Assets/Photos/Home/Prestations/Artisan.jpg"
import PortraitPhoto from "@Assets/Photos/Home/Prestations/Portrait.jpg"

export default function PrestationsHome(){

    const [prestationsButtons, setPrestationsButtons] = useState([
        {label:"Boudoir", selected:true, link:ROUTES.PRESTATIONS.BOUDOIR, img:BoudoirPhoto},
        {label:"Portrait", selected:false, link:ROUTES.PRESTATIONS.PORTRAIT, img:PortraitPhoto},
        {label:"Artisan", selected:false, link:ROUTES.PRESTATIONS.BOUDOIR, img:ArtisanPhoto},
    ])
    const [selectedPrestation, setSelectedPrestation] = useState(prestationsButtons[0])

    useEffect(() => {
        setSelectedPrestation(prestationsButtons.find(element => element.selected === true))
    }, [prestationsButtons])

    const switchPrestationPhoto = (userChoicePrestation) => {
        if(!userChoicePrestation !== selectedPrestation){
            const newPrestations = [...prestationsButtons].map(element => {
                element.selected = (userChoicePrestation.label === element.label)
                return element
            })
            setPrestationsButtons(newPrestations)
        }
    }

    return(
        <>
            <div className="buttons">
                {prestationsButtons.map((button, index) => (
                    <button key={index} onClick={() => switchPrestationPhoto(button)} className={`${button.selected ? "focus" : ""}`}>{button.label}</button>
                ))}
            </div>
            <picture>
                {prestationsButtons.map((button, index) => (
                    <img key={index} className={`${selectedPrestation === button ? "selected" : "unselected"}`} src={button.img} alt={`Photo de présentation de la prestation ${button.label}`}/>
                ))}
            </picture>
        </>
    )
}