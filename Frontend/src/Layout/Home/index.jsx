import "./style.scss";
import SectionComponent from "@Components/Section";

import ContactForm from "@Containers/Contact/Form";
import ExploreButton from "@Components/ExploreButton";
import PrestationsHome from "@Containers/Prestations/Home";
import AProposHome from "@Containers/A propos/Home";
import PortefoliosHome from "@Containers/Portefolios/Home";
import Medias from "@Containers/Media";
import { useDispatch } from "react-redux";
import ContactContainer from "@Containers/Contact";
import { useNavigate } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { openSubMenuForce } from "@Redux/Slices/routes";



export default function HomeLayout({
    prestationsPhotos,
    portefolioPhotos,
    aproposPhoto
}){


    const dispatch = useDispatch()

    return(
        <div id="home-main-layout">


            <SectionComponent label="Prestations" customClass="home-prestation">
                <div className="content">
                    <PrestationsHome prestationsPhotos={prestationsPhotos}/>
                    <ExploreButton onClick={() => {
                        dispatch(openSubMenuForce("Prestations"))
                        dispatch(setOpenPhoneMenu(true))
                    }} text={"En savoir plus"}/>
                </div>
            </SectionComponent>
            
            <SectionComponent label="À propos" customClass="home-apropos">
                <div className="content">
                    <AProposHome aproposPhoto={aproposPhoto}/>
                    <ExploreButton navigate={ROUTES.APROPOS} text={"Lire plus"}/>
                </div>

            </SectionComponent>

            <SectionComponent label="Portefolio" customClass="home-portefolio">
                <div className="content">
                    <PortefoliosHome portefolioPhotos={portefolioPhotos}/>
                    <ExploreButton onClick={() => {
                        dispatch(openSubMenuForce("Portefolio"))
                        dispatch(setOpenPhoneMenu(true))
                    }} text={"Parcourir"}/>
                </div>
            </SectionComponent>

            <SectionComponent label="Contact" customClass="home-contact">
                <div className="content">
                    <ContactContainer/>
                </div>
            </SectionComponent>

            <Medias color={"dark"}/>
        </div>
    )
}