import Header from "@Containers/Header";
import PhoneMenuContainer from "@Containers/phoneMenu";
import HomePage from "@Pages/Home";
import "./App.scss"
import { Route, Routes, useLocation } from "react-router-dom";
import ContactPage from "@Pages/Contact";
import PrestationPage from "@Pages/Prestations";
import PortefoliosPage from "@Pages/Portefolios";
import useRoute from "@Services/useRoute";
import ROUTES from "@Constants/Routes";
import AProposPage from "@Pages/APropos";
import { useEffect, useRef, useState } from "react";
import AdminPage from "@Pages/Admin";
import { AnimatePresence, motion } from "framer-motion";


export default function App() {

  useRoute()
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, [pathname]);

  
  
  return (
      <>
        <Header/>
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              style={{ opacity: 0, transform: 'scale(0.95)' }}
              key={pathname}
              initial={{ opacity: 0, transform:"scale(0.95)" }}
              animate={{ opacity: 1, transform:"scale(1)" }}
              exit={{ opacity:0, transition:{duration:0} }}
              transition={{ duration: 1 }}
            >
              <Routes>
                {/* Admin */}
                <Route path={ROUTES.ADMIN} element={<AdminPage/>}/>


                <Route path={ROUTES.HOME} element={<HomePage/>}/>

                <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationPage/>}/>
                <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationPage/>}/>
                <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPage/>}/>

                <Route path={`${ROUTES.ARTISAN}/:artisanID`} element={<PortefoliosPage/>} />

                <Route path={ROUTES.PORTEFOLIOS.STUDIO} element={<PortefoliosPage/>}/>
                <Route path={ROUTES.PORTEFOLIOS.FANTASTIQUE} element={<PortefoliosPage/>}/>
                <Route path={ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE} element={<PortefoliosPage/>}/>
                <Route path={ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE} element={<PortefoliosPage/>}/>
                <Route path={ROUTES.PORTEFOLIOS.NU_LINGERIE} element={<PortefoliosPage/>}/>
                
                <Route path={ROUTES.APROPOS} element={<AProposPage/>}/>
                <Route path={ROUTES.CONTACT} element={<ContactPage/>}/>
              </Routes>

            </motion.div>

          </AnimatePresence>
        </main>
        <PhoneMenuContainer/>
      </>
  )
}
