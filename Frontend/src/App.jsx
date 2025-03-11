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
import { useEffect, useState } from "react";
import AdminPage from "@Pages/Admin";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { setCurrentRoute } from "@Redux/Slices/routes";
import { setScreenSize } from "@Redux/Slices/App";


export default function App() {

  const location = useLocation()
  const pathname = location.pathname
  const dispatch = useDispatch()
  const {mobile, desktop} = useSelector(store => store.app)
  const [exitComplete, setExitComplete] = useState(false);
  
  
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
  
  // Si le chemin change, on indique que l'animation de sortie a commencer
  useEffect(() => {
    setExitComplete(false);
  }, [location.pathname]);

  // Paramètre d'animation de transition entre les pages
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 0.5;

  
  
  return (
    <>
        <Header/> {/*Nettoyer*/}
        <main>
          <AnimatePresence mode="wait" onExitComplete={() => setExitComplete(true)}>
            <motion.div
              key={location.pathname}

              // Avec scale
              // initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              // animate={{ opacity: 1, scale: 1 }}

              // Sans scale
              // initial={{ opacity: 0}}
              // animate={{ opacity: 1}}
              
              
              // exit={{ opacity: 0 }}

              // Transition global
              // transition={{ duration }}


              // Transition spécifique
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <Routes location={location}>
                <Route path={ROUTES.ADMIN} element={<AdminPage/>}/>


                <Route path={ROUTES.HOME} element={<HomePage/>}/> {/*Nettoyer*/}

                <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}

                <Route path={`${ROUTES.ARTISAN}/:artisanID`} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.INDEX} element={<PortefoliosIndexPage exitComplete={exitComplete} />}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.STUDIO} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.FANTASTIQUE} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.NU_LINGERIE} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                <Route path={ROUTES.PORTEFOLIOS.RETOUCHE_CREATIVE} element={<PortefoliosPage exitComplete={exitComplete}/>}/> {/*Nettoyer*/}
                
                <Route path={ROUTES.APROPOS} element={<AProposPage/>}/> {/*Nettoyer*/}

                <Route path={ROUTES.CONTACT} element={<ContactPage/>}/> {/*Nettoyer*/}
              </Routes>

            </motion.div>

          </AnimatePresence>
        </main>
        {mobile && (
          <PhoneMenuContainer/>
        )}
      </>
  )
}
