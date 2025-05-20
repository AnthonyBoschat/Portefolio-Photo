import HomeLayout from "@Layout/Home";
import { useEffect, useMemo, useRef, useState } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";
import ROUTES from "@Constants/Routes";
import { useSelector } from "react-redux";
import IntroductionContainer from "@Containers/Introduction";




export default function HomePage({introductionImageRef}){

    const { representants }     = useSelector(store => store.prestations);
    const { mobile }            = useSelector(store => store.app);
    const firstElementRef       = useRef(null)

    const extractImage = (label) => representants?.find(representant => representant?.name === label)?.image;

    
    const aproposPhoto          = STATIC_PHOTOS.APROPOS.JESAHEL;
    const portefolioPhotos      = mobile ? STATIC_PHOTOS.HOME.PORTEFOLIO : STATIC_PHOTOS.HOME.PORTEFOLIO_DESKTOP;
    const representantsPhotos   =   [
                                        { label: "Portrait", selected: true,  image: extractImage("Portrait"), link: ROUTES.PRESTATIONS.PORTRAIT },
                                        { label: "Artisan",  selected: false, image: extractImage("Artisan"),  link: ROUTES.PRESTATIONS.ARTISAN  },
                                        { label: "Boudoir",  selected: false, image: extractImage("Boudoir"),  link: ROUTES.PRESTATIONS.BOUDOIR  },
                                    ];

    
    const ready = !!(representants && portefolioPhotos && aproposPhoto);

    if (!ready) return null;
    return (
        <>
        <IntroductionContainer firstElementRef={firstElementRef} introductionImageRef={introductionImageRef} />
        <HomeLayout
            prestationsPhotos={representantsPhotos}
            portefolioPhotos={portefolioPhotos}
            aproposPhoto={aproposPhoto}
            firstElementRef={firstElementRef}
        />
        </>
    );
}