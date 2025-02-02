import Header from "@Containers/Header";
import PhoneMenuContainer from "@Containers/phoneMenu";
import HomePage from "@Pages/Home";
import "./App.scss"
import { Route, Routes } from "react-router-dom";
import ContactPage from "@Pages/Contact";
import PrestationArtisanPage from "@Pages/Prestations/Artisan";
import PrestationBoudoirPage from "@Pages/Prestations/Boudoir";
import PrestationPortraitPage from "@Pages/Prestations/Portrait";
import PortefoliosPage from "@Pages/Portefolios";
import useRoute from "@Services/useRoute";
import ROUTES from "@Constants/Routes";


export default function App() {

  useRoute()

  return (
      <>
        <Header/>
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage/>}/>
            <Route path={ROUTES.CONTACT} element={<ContactPage/>}/>
            <Route path={ROUTES.PRESTATIONS.ARTISAN} element={<PrestationArtisanPage/>}/>
            <Route path={ROUTES.PRESTATIONS.BOUDOIR} element={<PrestationBoudoirPage/>}/>
            <Route path={ROUTES.PRESTATIONS.PORTRAIT} element={<PrestationPortraitPage/>}/>
            <Route path={ROUTES.PORTEFOLIOS} element={<PortefoliosPage/>}/>
          </Routes>
        </main>
        <PhoneMenuContainer/>
      </>
  )
}
