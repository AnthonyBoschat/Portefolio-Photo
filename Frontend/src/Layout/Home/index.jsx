import { useEffect, useState } from "react";
import "./style.scss";
import ROUTES from "@Constants/Routes";
import SectionComponent from "@Components/Section";

import BoudoirPhoto from "@Assets/Photos/Home/Prestations/Boudoir.jpg"
import ArtisanPhoto from "@Assets/Photos/Home/Prestations/Artisan.jpg"
import PortraitPhoto from "@Assets/Photos/Home/Prestations/Portrait.jpg"

import JesahelPhoto from "@Assets/Photos/Home/aPropos/Jesahel.jpg"

import RoussePhoto from "@Assets/Photos/Home/Portefolio/Rousse.jpg"
import HommePhoto from "@Assets/Photos/Home/Portefolio/Homme.jpg"
import GrillePhoto from "@Assets/Photos/Home/Portefolio/Grille.jpg"



export default function HomeLayout(){



    // PRESTATION
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

    // PORTEFOLIO
    const portefolioPhotos = [
        HommePhoto,
        RoussePhoto,
        GrillePhoto,
    ]

    


    return(
        <div id="home-main-layout">

            <SectionComponent label="Prestations" customClass="home-prestation">
                <div className="content">
                    <div className="buttons">
                        {prestationsButtons.map(button => (
                            <button onClick={() => switchPrestationPhoto(button)} className={`${button.selected ? "focus" : ""}`}>{button.label}</button>
                        ))}
                    </div>
                    <picture>
                        {prestationsButtons.map(button => (
                            <img className={`${selectedPrestation === button ? "selected" : ""}`} src={button.img} alt={`Photo de présentation de la prestation ${button.label}`}/>
                        ))}
                        {/* <img src={selectedPrestation.img} alt="Photo de présentation de la prestation 'Boudoir'" /> */}
                    </picture>
                    <div className="redirect-button-container">
                        <button>En savoir plus</button>
                    </div>
                </div>
            </SectionComponent>
            
            <SectionComponent label="À propos" customClass="home-apropos">
                <div className="content">
                    <picture>
                        <img src={JesahelPhoto} alt="" />
                    </picture>
                    <p className="presentation">
                        <div className="long">
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            </span>
                            <span>
                                Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.
                            </span>
                            <span>
                                Cras elementum ultrices diam. Proin porttitor, orci nec.  
                            </span>
                            <span>
                                Enim est eleifend mi.
                            </span>
                        </div>
                        <div className="end">
                            <span>
                                Maecenas adipiscing ante non diam.
                            </span>
                        </div>
                    </p>
                </div>
            </SectionComponent>

            <SectionComponent label="Portefolio" customClass="home-portefolio">
                <div className="content">
                    {portefolioPhotos.map((photo, index) => (
                        <picture key={index}>
                            <img src={photo} alt="Photo de présentation de la catégorie 'Portefolio'" />
                        </picture>
                    ))}
                    <div className="redirect-button-container">
                        <button>Parcourir</button>
                    </div>
                </div>
            </SectionComponent>

            <SectionComponent label="Contact" customClass="home-contact">
                <div className="content">
                    
                </div>
            </SectionComponent>
        </div>
    )
}