import HomeLayout from "@Layout/Home";

import prestation1 from "./photos/prestation/1.webp"
import prestation2 from "./photos/prestation/2.webp"
import prestation3 from "./photos/prestation/3.webp"

import portefolio1 from "./photos/portefolio/1.jpg"
import portefolio2 from "./photos/portefolio/2.jpg"
import portefolio3 from "./photos/portefolio/3.jpg"



import apropos1 from "./photos/apropos/1.jpg"
import ROUTES from "@Constants/Routes";
import { useMemo } from "react";


export default function HomePage(){

    

    const prestationsPhotos = useMemo(() => [
        {label:"Portrait", selected:true, link:ROUTES.PRESTATIONS.PORTRAIT, img:prestation1},
        {label:"Artisan", selected:false, link:ROUTES.PRESTATIONS.BOUDOIR, img:prestation2},
        {label:"Boudoir", selected:false, link:ROUTES.PRESTATIONS.BOUDOIR, img:prestation3},
    ], [])

    const portefolioPhotos = useMemo(() => [
        portefolio1,
        portefolio2,
        portefolio3,
    ], [])

    const aproposPhoto = useMemo(() => apropos1, [])

    return(
        <HomeLayout
            prestationsPhotos={prestationsPhotos}
            portefolioPhotos={portefolioPhotos}
            aproposPhoto={aproposPhoto}
        />
    )
}