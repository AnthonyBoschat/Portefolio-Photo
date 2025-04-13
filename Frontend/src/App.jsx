import Header from "@Containers/Header";
import PhoneMenuContainer from "@Containers/phoneMenu";
import HomePage from "@Pages/Home";
import "./App.scss"
import { Route, Routes, useLocation } from "react-router-dom";
import ContactPage from "@Pages/Contact";
import PrestationPage from "@Pages/Prestations";
import PortefoliosPage from "@Pages/Portefolios";
import PortefoliosIndexPage from "@Pages/Portefolios/index/index.jsx";
import ROUTES from "@Constants/Routes";
import AProposPage from "@Pages/APropos";
import { useEffect, useRef, useState } from "react";
import AdminPage from "@Pages/Admin";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { setCurrentRoute } from "@Redux/Slices/routes";
import { setScreenSize } from "@Redux/Slices/App";
import Lenis from "lenis";
import ZoomOverlay from "@Containers/ZoomOverlay";
import Footer from "@Containers/Footer";
import PrestationsIndexPage from "@Pages/Prestations/index/index.jsx";

// Composant wrapper qui permet d'avoir un scroll fluide
function SmoothScrollWrapper({ children }) {

  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5, // durée de l’animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(1.5, -15 * t)), // Paramètre de l'animation
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [location.pathname]);

  return children;
}


export default function App() {

  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useDispatch()
  const {mobile, desktop} = useSelector(store => store.app)
  
  
  // A chaque changement d'url ( de page ) 
  useEffect(() => {
      window.scrollTo({top: 0, behavior: 'smooth'}); // Repositionne la vue utilisateur en haut de l'écran
      dispatch(setOpenPhoneMenu(false)) // Ferme le menu de navigation téléphone
      dispatch(setCurrentRoute(pathname)) // set dans le store routes le currentRoute
  }, [pathname]);
  
  
  
  // Enregistre le dimensionnement de la fenêtre pour gérer l'affichage dynamique de composant
  useEffect(() => {
    dispatch(setScreenSize(window.innerWidth));
    const setSize = () => {
      dispatch(setScreenSize(window.innerWidth))
    }
    window.addEventListener("resize", setSize)
    
    return () => window.removeEventListener("resize", setSize)
  }, [])

  // Paramètre d'animation de transition entre les pages
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.5;

  const introductionImageRef = useRef(null);
  
  
  return (
    <>
        <ZoomOverlay/>
        <Header introductionImageRef={introductionImageRef}/> {/*Nettoyer*/}
        <main >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
              <SmoothScrollWrapper>
                <Routes location={location}>
                  <Route path={ROUTES.ADMIN} element={<AdminPage/>}/>


                  <Route path={ROUTES.HOME} element={<HomePage introductionImageRef={introductionImageRef}/>}/> {/*Nettoyer*/}

                  <Route path={ROUTES.PRESTATIONS.INDEX} element={<PrestationsIndexPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPage/>}/> {/*Nettoyer*/}

                  <Route path={ROUTES.PORTEFOLIOS.INDEX} element={<PortefoliosIndexPage />}/> {/*Nettoyer*/}
                  <Route path={`${ROUTES.ARTISAN}/:artisanID`} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.STUDIO} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.FANTASTIQUE} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.NU_LINGERIE} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  <Route path={ROUTES.PORTEFOLIOS.RETOUCHE_CREATIVE} element={<PortefoliosPage/>}/> {/*Nettoyer*/}
                  
                  <Route path={ROUTES.APROPOS} element={<AProposPage/>}/> {/*Nettoyer*/}

                  <Route path={ROUTES.CONTACT} element={<ContactPage/>}/> {/*Nettoyer*/}
                </Routes>

              </SmoothScrollWrapper>
              <Footer/>
            </motion.div>

          </AnimatePresence>
        </main>
        {mobile && (
          <PhoneMenuContainer/>
        )}
    </>
  )
}
