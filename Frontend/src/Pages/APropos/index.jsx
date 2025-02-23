import AProposLayout from "@Layout/APropos";
import { useMemo } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";

export default function AProposPage(){

    const aproposPhoto = useMemo(() => ({
        jesahelPhoto:STATIC_PHOTOS.APROPOS.JESAHEL,
        naturalLight:STATIC_PHOTOS.APROPOS.NATURAL_LIGHT,
        artisanPhoto:STATIC_PHOTOS.APROPOS.ARTISAN,
    }), [])

    return(
        <AProposLayout aproposPhoto={aproposPhoto}/>
    )
}