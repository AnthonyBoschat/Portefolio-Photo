import HomeLayout from "@Layout/Home";
import { useMemo } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";
import ROUTES from "@Constants/Routes";


export default function HomePage(){

    

    const prestationsPhotos = useMemo(() => [
        {label:"Portrait", selected:true, image:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT, url:ROUTES.PRESTATIONS.PORTRAIT},
        {label:"Artisan", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.ARTISAN, url:ROUTES.PRESTATIONS.ARTISAN},
        {label:"Boudoir", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.BOUDOIR, url:ROUTES.PRESTATIONS.BOUDOIR},
    ], [])

    const portefolioPhotos = useMemo(() => STATIC_PHOTOS.HOME.PORTEFOLIO, [])

    const aproposPhoto = useMemo(() => STATIC_PHOTOS.APROPOS.JESAHEL, [])

    return(
        <HomeLayout
            prestationsPhotos={prestationsPhotos}
            portefolioPhotos={portefolioPhotos}
            aproposPhoto={aproposPhoto}
        />
    )
}