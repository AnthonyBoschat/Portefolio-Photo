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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { setCurrentRoute, setPortefoliosRoutes, setPrestationsRoutes } from "@Redux/Slices/routes";
import { setScreenSize } from "@Redux/Slices/App";
import Lenis from "lenis";
import ZoomOverlay from "@Containers/ZoomOverlay";
import Footer from "@Containers/Footer";
import PrestationsIndexPage from "@Pages/Prestations/index/index.jsx";
import AdminPage from "@Pages/Admin";
import Admin_Login from "@Pages/Admin/Components/Login";
import Admin_Dashboard from "@Pages/Admin/Components/Dashboard";
import { Flip, ToastContainer } from "react-toastify";
import { init_portefolios } from "@Redux/Slices/portefolios";
import { init_prestations } from "@Redux/Slices/prestations";
import ENDPOINT from "@Constants/Endpoint";
import { setArtisansList } from "@Redux/Slices/artisans";
import LegalPage from "@Pages/Legal";
import BackToTopButton from "@Components/BackToTopButton";

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

  const animation_duration    = 0.5
  const animation_out         = 0.3 // ms
  const animation_in          = 0.6 // ms
  const introductionImageRef  = useRef(null);
  const location              = useLocation()
  const pathname              = location.pathname
  const dispatch              = useDispatch()
  const {mobile, desktop}     = useSelector(store => store.app)
  const portefolios           = useSelector(store => store.portefolios.collections)
  const prestations           = useSelector(store => store.prestations.collections)
  const artisans              = useSelector(store => store.artisans.collections)
  const {pageDirectionConfig} = useSelector(store => store.routes)



  // TEST
  const isFirstRender         = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  });
  
  
  const isAdminPage = useMemo(() => pathname.includes(ROUTES.ADMIN.PAGE),[pathname])
  const isIndexPage = useMemo(() => (pathname === ROUTES.PORTEFOLIOS.INDEX || pathname === ROUTES.PRESTATIONS.INDEX ), [pathname])

  // Requête initial pour récupérer toutes les données du backend
  // Stock ces données dans les stores reduxs
  useEffect(() => {
      Promise.all([
          fetch(ENDPOINT.PORTEFOLIOS.LIST).then(response => response.json()),
          fetch(ENDPOINT.PRESTATIONS.LIST).then(response => response.json()),
          fetch(ENDPOINT.ARTISANS.LIST).then(response => response.json()),
      ]).then(([portefolios, prestations, artisans]) => {
          dispatch(init_portefolios(portefolios))
          dispatch(init_prestations(prestations))
          dispatch(setArtisansList(artisans))
          dispatch(setPortefoliosRoutes(portefolios))
          dispatch(setPrestationsRoutes(prestations))
      })
  }, [])

  // A chaque changement d'url ( de page ) 
  useEffect(() => {

    // window.scrollTo({top: 0, behavior: 'smooth'}); // Repositionne la vue utilisateur en haut de l'écran

    // setTimeout(() => {
    //   window.scrollTo({top: 0, behavior: 'instant'}); // Après la durée d'animation de sortie en ms, déplace immédiatement en haut de l'écran
    // }, (animation_out * 1000));
    setTimeout(() => {
      window.scrollTo({top: 0, behavior: 'instant'}); // Après la durée d'animation de sortie en ms, déplace immédiatement en haut de l'écran
    }, (animation_duration * 1000));
    dispatch(setOpenPhoneMenu(false)) // Ferme le menu de navigation téléphone
    dispatch(setCurrentRoute(pathname)) // set dans le store routes le pathname
  }, [pathname]);
  
  
  
  // Enregistre le dimensionnement de la fenêtre pour gérer l'affichage dynamique de composant
  useEffect(() => {
    dispatch(setScreenSize(window.innerWidth));
    const setSize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener("resize", setSize)

    return () => window.removeEventListener("resize", setSize)
  }, [])


  
  
  return (
    <>
        <ZoomOverlay/>


        {!isAdminPage && ( <Header introductionImageRef={introductionImageRef}/> )}

        <main>
          <AnimatePresence mode="wait">
            {/* <motion.div
              key={pathname}
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: animation_in } }}
              exit={{ opacity: 0, transition: {duration: animation_out} }}
              > */}


            {/* <motion.div
              key={pathname}
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: animation_in } }}
              exit={{ opacity: 0, x: "-10%", transition: { 
                duration: animation_out,
                x: { 
                  duration: 0.5,  // translation en 0.5s
                  ease: "easeOut",
                  delay: 0.1  // commence après 0.1s
                }
                },  
              }}
              > */}

              {/* <motion.div
                key={pathname}
                initial={{ 
                  opacity: isFirstRender.current ? 1 : 0,
                  x: location.pathname === "/" ? "0%" : "5rem",  // Commence décalé vers la droite
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,  // Revient au centre
                  z: 0,
                  transition: { 
                    duration: animation_in,
                    opacity: {
                      duration: 0.3,
                      ease: "easeOut"
                    },
                    x: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  } 
                }}
                exit={{ 
                  opacity: 0, 
                  x: "-5rem",
                  transition: { 
                    duration: animation_out,
                    x: { 
                      duration: 0.3,
                      ease: "easeIn",
                    },
                  }
                }}
              > */}

              <motion.div
                key={pathname}
                initial={{ 
                  opacity: isFirstRender.current ? 1 : 0,
                  x: pageDirectionConfig.initial_x,
                  y: pageDirectionConfig.initial_y ? pageDirectionConfig.initial_y : "0rem",
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,  // Revient au centre
                  y: 0,
                  transition: { 
                    duration: animation_duration,
                    opacity: {
                      duration: animation_duration,
                      ease: "easeOut"
                    },
                    x: {
                      duration: animation_duration,
                      ease: "easeOut",
                    },
                    y: {
                      duration: animation_duration,
                      ease: "easeOut",
                    }
                  } 
                }}
                exit={{ 
                  opacity: 0, 
                  x: pageDirectionConfig.exit_x,
                  y: pageDirectionConfig.exit_y ? pageDirectionConfig.exit_y : "0rem",
                  transition: { 
                    duration: animation_duration,
                    x: { 
                      duration: animation_duration,
                      ease: "easeIn",
                    },
                    y: { 
                      duration: animation_duration,
                      ease: "easeIn",
                    },
                  }
                }}
              >

              <SmoothScrollWrapper>
                
                <Routes location={location}>

                  <Route path={ROUTES.ADMIN.PAGE} element={<AdminPage/>}>
                    <Route path={ROUTES.ADMIN.LOGIN} element={<Admin_Login/>}/>
                    <Route path={ROUTES.ADMIN.DASHBOARD} element={<Admin_Dashboard/>}/>
                  </Route>


                  <Route path={ROUTES.HOME} element={<HomePage introductionImageRef={introductionImageRef}/>}/> 

                  <Route path={ROUTES.PRESTATIONS.INDEX} element={<PrestationsIndexPage/>}/> 
                  {prestations.map(prestation => (
                    <Route key={prestation.id} path={`/Prestations/${prestation.name}`} element={<PrestationPage prestationID={prestation.id} name={prestation.name}/>}/>
                  ))}
                  <Route path={ROUTES.PORTEFOLIOS.INDEX} element={<PortefoliosIndexPage />}/> 
                  {artisans.map(artisan => (
                    <Route key={artisan.id} path={`/Artisan/${artisan.name}`} element={<PortefoliosPage artisanID={artisan.id} name={artisan.name}/>}/>
                  ))}
                  {portefolios.map(portefolio => (
                    <Route key={portefolio.id} path={`/Portefolios/${portefolio.name}`} element={<PortefoliosPage portefolioID={portefolio.id} name={portefolio.name} />}/>
                  ))}
                  
                  <Route path={ROUTES.APROPOS} element={<AProposPage/>}/> 

                  <Route path={ROUTES.CONTACT} element={<ContactPage/>}/> 


                  <Route path={ROUTES.MENTION_LEGAL} element={<LegalPage/>}/> 
                  <Route path={ROUTES.POLITICS} element={<LegalPage/>}/> 
                </Routes>

              </SmoothScrollWrapper>


              {(!isAdminPage && !isIndexPage) && (<Footer/>)}

            </motion.div>

          </AnimatePresence>
        </main>
        {mobile && (<PhoneMenuContainer/>)}
        <ToastContainer transition={Flip} />
        {desktop && (<BackToTopButton/>)}
    </>
  )
}
