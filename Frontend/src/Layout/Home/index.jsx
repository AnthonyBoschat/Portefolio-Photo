import { useEffect, useState } from "react";
import "./style.scss";
import BoudoirPhoto from "@Assets/Photos/Home/Prestations/Boudoir.jpg"
import ArtisanPhoto from "@Assets/Photos/Home/Prestations/Artisan.jpg"
import PortraitPhoto from "@Assets/Photos/Home/Prestations/Portrait.jpg"
import ROUTES from "@Constants/Routes";

export default function HomeLayout(){



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
        <div id="home-main-layout">
            <section id="prestation">
                <div className="title">
                    <span className="label">Prestations</span>
                </div>

                <div className="content">
                    <div className="buttons">
                        {prestationsButtons.map(button => (
                            <button onClick={() => switchPrestationPhoto(button)} className={`${button.selected ? "focus" : ""}`}>{button.label}</button>
                        ))}
                    </div>
                    <picture>
                        <img src={selectedPrestation.img} alt="Photo de présentation de la prestation 'Boudoir'" />
                    </picture>
                    <div className="redirect-button-container">
                        <button>En savoir plus</button>
                    </div>
                </div>

            </section>
        </div>
    )
}