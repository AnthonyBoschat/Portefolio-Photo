import HomeLayout from "@Layout/Home";
import { useMemo, useRef } from "react";
import STATIC_PHOTOS from "@Constants/StaticPhotos/StaticPhotos";
import ROUTES from "@Constants/Routes";
import { useSelector } from "react-redux";
import IntroductionContainer from "@Containers/Introduction";

import { useEffect } from 'react';
import Lenis from "lenis";

function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1, // durée de l’animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing smooth
      smoothWheel: true, // activer smooth pour la roulette souris
      smoothTouch: false, // désactiver smooth pour le tactile (optionnel)
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Nettoyage à la désinstallation du composant
    return () => lenis.destroy();
  }, []);

  return children;
}



export default function HomePage(){

    const {mobile, desktop} = useSelector(store => store.app)

    const prestationsPhotos = useMemo(() => [
        {label:"Portrait", selected:true, image:STATIC_PHOTOS.HOME.PRESTATION.PORTRAIT, url:ROUTES.PRESTATIONS.PORTRAIT},
        {label:"Artisan", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.ARTISAN, url:ROUTES.PRESTATIONS.ARTISAN},
        {label:"Boudoir", selected:false, image:STATIC_PHOTOS.HOME.PRESTATION.BOUDOIR, url:ROUTES.PRESTATIONS.BOUDOIR},
    ], [])

    const portefolioPhotos = useMemo(() => mobile ? STATIC_PHOTOS.HOME.PORTEFOLIO : STATIC_PHOTOS.HOME.PORTEFOLIO_DESKTOP, [mobile])

    const aproposPhoto = useMemo(() => STATIC_PHOTOS.APROPOS.JESAHEL, [])

    const firstElementRef = useRef()

    return(
        <>
            {desktop && (
                    <IntroductionContainer firstElementRef={firstElementRef}/>
                )}
            <HomeLayout
                firstElementRef={firstElementRef}
                prestationsPhotos={prestationsPhotos}
                portefolioPhotos={portefolioPhotos}
                aproposPhoto={aproposPhoto}
                />
        </>
    )
}