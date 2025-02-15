import ROUTES from "@Constants/Routes";
import PrestationsLayout from "@Layout/Prestations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import portraitBanner1 from "./photos/portrait/banner/1.jpg"
import portraitBanner2 from "./photos/portrait/banner/2.jpg"
import portraitBanner3 from "./photos/portrait/banner/3.jpg"

import boudoirBanner1 from "./photos/boudoir/banner/1.jpg"
import boudoirBanner2 from "./photos/boudoir/banner/2.jpg"
import boudoirBanner3 from "./photos/boudoir/banner/3.jpg"

import artisanBanner1 from "./photos/artisan/banner/1.jpg"
import artisanBanner2 from "./photos/artisan/banner/2.jpg"
import artisanBanner3 from "./photos/artisan/banner/3.jpg"


import carous1 from "./photos/carousel/1.jpg";
import carous2 from "./photos/carousel/2.jpg";
import carous3 from "./photos/carousel/3.jpg";
import carous4 from "./photos/carousel/4.jpg";
import carous5 from "./photos/carousel/5.jpg";
import ENDPOINT from "@Constants/Endpoint";


const boudoirResponse = {
    banner:[
        {img:boudoirBanner1, type:"portrait"},
        {img:boudoirBanner2, type:"portrait"},
        {img:boudoirBanner3, type:"portrait"},
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
        {img:portraitBanner1, type:"portrait"},
        {img:portraitBanner2, type:"portrait"},
        {img:portraitBanner3, type:"portrait"},
    ],
    presentation:[
        {img:carous1, type:"portrait"},
        {img:carous2, type:"portrait"},
        {img:carous3, type:"paysage"},
        {img:carous4, type:"portrait"},
        {img:carous5, type:"paysage"},
        {img:carous5, type:"paysage"},
        {img:carous5, type:"paysage"},
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
        {img:artisanBanner1, type:"portrait"},
        {img:artisanBanner2, type:"portrait"},
        {img:artisanBanner3, type:"portrait"},
    ],
    presentation:[
        {img:artisanBanner1, type:"portrait", label:"Atelier By Lau"},
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
    const [galeryPhotos, setGaleryPhotos] = useState([])
    // Contient les informations de la prestation
    const [informations, setInformations] = useState({})
    // Contient la description de la prestation
    const [description, setDescription] = useState([])


    // Charge dans le state les photos de la réponse
    useEffect(() => {
        let bannerPhotos
        let informations
        let description

        let endpoint = false
        switch(currentRoute){
            
            case ROUTES.PRESTATIONS.PORTRAIT:
                endpoint = ENDPOINT.LOAD("prestation", "pre_portrait")
                bannerPhotos = portraitResponse.banner
                informations = portraitResponse.informations
                description = portraitResponse.description
                break;

            case ROUTES.PRESTATIONS.ARTISAN:
                endpoint = ENDPOINT.getArtisans
                bannerPhotos = artisanResponse.banner
                informations = artisanResponse.informations
                description = artisanResponse.description
                break

            case ROUTES.PRESTATIONS.BOUDOIR:
                endpoint = ENDPOINT.LOAD("prestation", "pre_boudoir")
                bannerPhotos = boudoirResponse.banner
                informations = boudoirResponse.informations
                description = boudoirResponse.description
                break

            default:
                break
        }

        if(endpoint){
            fetch(endpoint)
            .then(response => response.json())
            .then(galeriePhotos => {
                setGaleryPhotos(galeriePhotos.map((photo, index) => ({...photo, selected: index === 0})))
            })
            setBannerPhotos(bannerPhotos)
            setInformations(informations)
            setDescription(description)
        }
    }, [currentRoute])

    return(
        <PrestationsLayout 
            description={description}
            informations={informations}
            galeryPhotos={galeryPhotos} 
            setGaleryPhotos={setGaleryPhotos}
            bannerPhotos={bannerPhotos}
            currentRoute={currentRoute}
        />
    )
}