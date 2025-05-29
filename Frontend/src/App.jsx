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
import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const {mobile} = useSelector(store => store.app)
  const portefolios = useSelector(store => store.portefolios.collections)
  const prestations = useSelector(store => store.prestations.collections)
  const artisans = useSelector(store => store.artisans.collections)
  
  
  const isAdminPage = useMemo(() => pathname.includes(ROUTES.ADMIN.PAGE),[pathname])
  const isIndexPage = useMemo(() => (pathname === ROUTES.PORTEFOLIOS.INDEX || pathname === ROUTES.PRESTATIONS.INDEX ), [pathname])

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
        // dispatch(setArtisansRoutes(artisans))
    })
}, [])

  // A chaque changement d'url ( de page ) 
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'}); // Repositionne la vue utilisateur en haut de l'écran
    setTimeout(() => {
      window.scrollTo({top: 0, behavior: 'instant'}); // Repositionne la vue utilisateur en haut de l'écran
    }, 300);
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


        {!isAdminPage && ( <Header introductionImageRef={introductionImageRef}/> )}

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0}}
              animate={{ opacity: 1, transition: { duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
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
        {mobile && (
          <PhoneMenuContainer/>
        )}
        <ToastContainer transition={Flip} />

    </>
  )
}
