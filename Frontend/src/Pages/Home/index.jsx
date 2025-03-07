import HomeLayout from "@Layout/Home";
import { useMemo } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";
import ROUTES from "@Constants/Routes";
import { useSelector } from "react-redux";


export default function HomePage(){

    const {mobile} = useSelector(store => store.app)

    const prestationsPhotos = useMemo(() => [
        {label:"Portrait", selected:true, image:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT, url:ROUTES.PRESTATIONS.PORTRAIT},
        {label:"Artisan", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.ARTISAN, url:ROUTES.PRESTATIONS.ARTISAN},
        {label:"Boudoir", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.BOUDOIR, url:ROUTES.PRESTATIONS.BOUDOIR},
    ], [])

    const portefolioPhotos = useMemo(() => mobile ? STATIC_PHOTOS.HOME.PORTEFOLIO : STATIC_PHOTOS.HOME.PORTEFOLIO_DESKTOP, [mobile])

    const aproposPhoto = useMemo(() => STATIC_PHOTOS.APROPOS.JESAHEL, [])

    return(
        <HomeLayout
            prestationsPhotos={prestationsPhotos}
            portefolioPhotos={portefolioPhotos}
            aproposPhoto={aproposPhoto}
        />
    )
}