import Header from "@Containers/Header";
import PhoneMenuContainer from "@Containers/phoneMenu";
import HomePage from "@Pages/Home";
import "./App.scss"
import { Route, Routes, useLocation } from "react-router-dom";
import ContactPage from "@Pages/Contact";
import PrestationArtisanPage from "@Pages/Prestations/Artisan";
import PrestationBoudoirPage from "@Pages/Prestations/Boudoir";
import PrestationPortraitPage from "@Pages/Prestations/Portrait";
import PortefoliosPage from "@Pages/Portefolios";
import useRoute from "@Services/useRoute";
import ROUTES from "@Constants/Routes";
import AProposPage from "@Pages/APropos";
import { useEffect } from "react";


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
            <Route path={ROUTES.HOME} element={<HomePage/>}/>
            <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationArtisanPage/>}/>
            <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationBoudoirPage/>}/>
            <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPortraitPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS} element={<PortefoliosPage/>}/>
            <Route path={ROUTES.APROPOS} element={<AProposPage/>}/>
            <Route path={ROUTES.CONTACT} element={<ContactPage/>}/>
          </Routes>
        </main>
        <PhoneMenuContainer/>
      </>
  )
}
