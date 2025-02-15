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
import { useEffect, useState } from "react";
import AdminPage from "@Pages/Admin";


export default function App() {

  useRoute()
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [pathname]);

  
  
  return (
      <>
        <Header/>
        <main>
          <Routes>
            {/* Admin */}
            <Route path={ROUTES.ADMIN} element={<AdminPage/>}/>


            <Route path={ROUTES.HOME} element={<HomePage/>}/>
            <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationPage/>}/>
            <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationPage/>}/>
            <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPage/>}/>
            {/* <Route path={[
              ROUTES.PORTEFOLIOS.STUDIO,
              ROUTES.PORTEFOLIOS.FANTASTIQUE,
              ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE,
              ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE,
              ROUTES.PORTEFOLIOS.NU_LINGER
            ]} element={<PortefoliosPage/>}/> */}
            <Route path={ROUTES.PORTEFOLIOS.STUDIO} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS.FANTASTIQUE} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS.COLLABORATION_ARTISTIQUE} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS.LUMIERE_NATURELLE} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS.NU_LINGERIE} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.APROPOS} element={<AProposPage/>}/>
            <Route path={ROUTES.CONTACT} element={<ContactPage/>}/>
          </Routes>
        </main>
        <PhoneMenuContainer/>
      </>
  )
}
