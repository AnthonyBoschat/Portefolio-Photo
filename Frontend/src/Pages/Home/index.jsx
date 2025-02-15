import HomeLayout from "@Layout/Home";
import { useMemo } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";


export default function HomePage(){

    

    const prestationsPhotos = useMemo(() => [
        {label:"Portrait", selected:true, img:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT},
        // {label:"Artisan", selected:false, img:STATIC_PHOTOS.HOME.PRESTATION.ARTISAN},
        {label:"Artisan", selected:false, img:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT_HIGHTQUALITY},
        {label:"Boudoir", selected:false, img:STATIC_PHOTOS.HOME.PRESTATION.BOUDOIR},
    ], [])

    const portefolioPhotos = useMemo(() => STATIC_PHOTOS.HOME.PORTEFOLIO, [])

    const aproposPhoto = useMemo(() => STATIC_PHOTOS.HOME.APROPOS, [])

    return(
        <HomeLayout
            prestationsPhotos={prestationsPhotos}
            portefolioPhotos={portefolioPhotos}
            aproposPhoto={aproposPhoto}
        />
    )
}