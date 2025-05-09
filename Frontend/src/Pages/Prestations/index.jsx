import ROUTES from "@Constants/Routes";
import PrestationsLayout from "@Layout/Prestations";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ENDPOINT from "@Constants/Endpoint";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";
import sortByPhotoType from "@Services/sortByPhotoType";
import { useLocation } from "react-router-dom";
import callBackend from "@Services/callBackend";


const boudoirPrestation = {
    banner:STATIC_PHOTOS.PRESTATION.BOUDOIR.BANNER,
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

const portraitPrestation = {
    banner:STATIC_PHOTOS.PRESTATION.PORTRAIT.BANNER,
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

const artisanPrestation = {
    banner:STATIC_PHOTOS.PRESTATION.ARTISAN.BANNER,
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

    const location = useLocation()
    const currentRoute = location.pathname
    
    const [loading, setLoading]= useState(true)

    // Contient les photo de bannière
    const [bannerPhotos, setBannerPhotos] = useState(null)
    // Contient les photos de présentation
    const [galeryPhotos, setGaleryPhotos] = useState(null)
    // Contient les informations de la prestation
    const [informations, setInformations] = useState(null)
    // Contient la description de la prestation
    const [description, setDescription] = useState(null)

    useEffect(() => {
        setLoading(true)
    }, [currentRoute])

    // Charge dans le state les photos de la réponse
    useEffect(() => {

        const loadDatas = async() => {

            if(loading){
    
                let bannerPhotos
                let informations
                let description
        
                let endpoint = false
                switch(currentRoute){
                    
                    case ROUTES.PRESTATIONS.PORTRAIT:
                        endpoint = ENDPOINT.LOAD("prestation", "pre_portrait")
                        bannerPhotos = portraitPrestation.banner
                        informations = portraitPrestation.informations
                        description = portraitPrestation.description
                        break;
        
                    case ROUTES.PRESTATIONS.ARTISAN:
                        endpoint = ENDPOINT.getArtisans
                        bannerPhotos = artisanPrestation.banner
                        informations = artisanPrestation.informations
                        description = artisanPrestation.description
                        break
        
                    case ROUTES.PRESTATIONS.BOUDOIR:
                        endpoint = ENDPOINT.LOAD("prestation", "pre_boudoir")
                        bannerPhotos = boudoirPrestation.banner
                        informations = boudoirPrestation.informations
                        description = boudoirPrestation.description
                        break
        
                    default:
                        break
                }
        
                if(endpoint){
                    const galeriePhotos = await callBackend(endpoint)
                    const sortedPhotos = sortByPhotoType(galeriePhotos, {
                        reverse: true,
                        portraitNumber: 2
                    })
                    setGaleryPhotos(sortedPhotos)
                    setBannerPhotos(bannerPhotos)
                    setInformations(informations)
                    setDescription(description)
                    setLoading(false)
                }
            }
        }
        loadDatas()

    }, [loading, currentRoute])

    return(
        <>
            {/* {!loading && (
                <PrestationsLayout 
                    description={description}
                    informations={informations}
                    galeryPhotos={galeryPhotos} 
                    setGaleryPhotos={setGaleryPhotos}
                    bannerPhotos={bannerPhotos}
                    currentRoute={currentRoute}
                />
            )} */}
            coucou
        </>
    )
}