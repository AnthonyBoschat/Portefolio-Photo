import AProposLayout from "@Layout/APropos";

import jesahelPhoto from "./photos/jesahel.jpg";
import naturalLight from "./photos/naturalLight.jpg";
import artisanPhoto from "./photos/artisan.jpg";

import { useMemo } from "react";

export default function AProposPage(){

    const aproposPhoto = useMemo(() => ({
        jesahelPhoto:jesahelPhoto,
        artisanPhoto:artisanPhoto,
        naturalLight:naturalLight
    }), [])

    return(
        <AProposLayout aproposPhoto={aproposPhoto}/>
    )
}