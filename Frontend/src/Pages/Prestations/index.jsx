import ROUTES from "@Constants/Routes";
import PrestationsLayout from "@Layout/Prestations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import photo1 from "./photos/1.jpg";
import photo2 from "./photos/2.jpg";
import photo3 from "./photos/3.jpg";
import photo4 from "./photos/4.jpg";


import carous1 from "./photos/carousel/1.jpg";
import carous2 from "./photos/carousel/2.jpg";
import carous3 from "./photos/carousel/3.jpg";
import carous4 from "./photos/carousel/4.jpg";
import carous5 from "./photos/carousel/5.jpg";

import artisan1 from "./photos/artisan1.jpg";
import artisan2 from "./photos/artisan2.jpg";
import artisan3 from "./photos/artisan3.jpg";

const boudoirResponse = {
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
    ],
    informations:{
        duration:[3, 4],
        photosProvide:10,
        price:435
    },
    description:[
        "Autant de tenues que vous souhaitez.",
        "(Re)découvrez-vous à travers une séance intimiste et bienveillante, conçue pour que vous soyez à l’aise.",
        "On prend le temps qu’il faut, et je suis là pour vous guider tout en respectant vos limites.",
        "Vous pouvez aussi choisir des options comme le maquillage ou un lieu spécifique (en supplément)."
    ]
}

const portraitResponse = {
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
    ],
    informations:{
        duration:[2],
        photosProvide:3,
        price:195
    },
    description:[
        "Une séance simple et naturelle pour capturer de beaux portraits ou des moments lifestyle.",
        "Que ce soit en extérieur ou chez vous, je m’adapte à vos envies.",
        "Vous pouvez ajouter des options comme le maquillage ou une séance en studio (suppléments disponibles)."
    ]
}

const artisanResponse = {
    banner:[
        {img:artisan1, type:"portrait"},
        {img:artisan2, type:"portrait"},
        {img:artisan3, type:"portrait"},
    ],
    presentation:[
        {img:artisan1, type:"portrait", label:"Atelier By Lau"},
        {img:carous1, type:"portrait", label:"L'orée Sucrée"},
        {img:carous2, type:"paysage", label: "Le Grain d'Or"},
        {img:carous3, type:"portrait", label: "Délice de paris"},
        {img:carous4, type:"portrait", label: "La maison des Heures"},
        {img:carous5, type:"paysage", label: "Pure Précision"},
    ],
    informations:{
        duration:[2, 3],
        photosProvide:10,
        price:295
    },
    description:[
        "Mettez en lumière votre savoir-faire, votre atelier ou un moment clé de votre activité.",
        "Cette formule flexible est parfaite pour refléter votre univers professionnel.",
        "Des options comme le maquillage ou la location d’un lieu peuvent être ajoutées en supplément."
    ]
}

export default function PrestationPage(){

    const currentRoute = useSelector(state => state.routes.currentRoute)

    // Contient les photo de bannière
    const [bannerPhotos, setBannerPhotos] = useState([])
    // Contient les photos de présentation
    const [presentationPhotos, setPresentationPhotos] = useState([])
    // Contient les informations de la prestation
    const [informationsPrestation, setInformationsPrestation] = useState({})
    // Contient la description de la prestation
    const [descriptionPrestation, setDescriptionPrestation] = useState([])

    // Charge dans le state les photos de la réponse
    useEffect(() => {
        let presentationPhotos
        let bannerPhotos
        let informations
        let description
        switch(currentRoute){
            
            case ROUTES.PRESTATIONS.ARTISAN:
                presentationPhotos = artisanResponse.presentation
                bannerPhotos = artisanResponse.banner
                informations = artisanResponse.informations
                description = artisanResponse.description
                break
            case ROUTES.PRESTATIONS.BOUDOIR:
                presentationPhotos = boudoirResponse.presentation.map((photo, index) => ({...photo, selected: index === 0}))
                bannerPhotos = boudoirResponse.banner
                informations = boudoirResponse.informations
                description = boudoirResponse.description
                break
            case ROUTES.PRESTATIONS.PORTRAIT:
                presentationPhotos = portraitResponse.presentation.map((photo, index) => ({...photo, selected: index === 0}))
                bannerPhotos = portraitResponse.banner
                informations = portraitResponse.informations
                description = portraitResponse.description
                break;
            default:
                break
        }
        setPresentationPhotos(presentationPhotos)
        setBannerPhotos(bannerPhotos)
        setInformationsPrestation(informations)
        setDescriptionPrestation(description)
    }, [currentRoute])

    return(
        <PrestationsLayout 
            descriptionPrestation={descriptionPrestation}
            informationsPrestation={informationsPrestation}
            presentationPhotos={presentationPhotos} 
            setPresentationPhotos={setPresentationPhotos} 
            bannerPhotos={bannerPhotos}
            currentRoute={currentRoute}
        />
    )
}