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


export default function App() {

  useRoute()

  return (
      <>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/Contact" element={<ContactPage/>}/>
            <Route path="/Prestations/Artisan" element={<PrestationArtisanPage/>}/>
            <Route path="/Prestations/Boudoir" element={<PrestationBoudoirPage/>}/>
            <Route path="/Prestations/Portrait" element={<PrestationPortraitPage/>}/>
            <Route path="/Portefolios" element={<PortefoliosPage/>}/>
          </Routes>
        </main>
        <PhoneMenuContainer/>
      </>
  )
}
