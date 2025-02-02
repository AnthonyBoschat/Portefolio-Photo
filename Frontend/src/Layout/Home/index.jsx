import "./style.scss";
import SectionComponent from "@Components/Section";

import ContactForm from "@Containers/ContactForm";
import ExploreButton from "@Components/ExploreButton";
import PrestationsHome from "@Containers/Prestations/Home";
import AProposHome from "@Containers/A propos/Home";
import PortefoliosHome from "@Containers/Portefolios/Home";
import Medias from "@Containers/Media/Home";



export default function HomeLayout(){


    return(
        <div id="home-main-layout">

            <SectionComponent label="Prestations" customClass="home-prestation">
                <div className="content">
                    <PrestationsHome/>
                    <ExploreButton text={"En savoir plus"}/>
                </div>
            </SectionComponent>
            
            <SectionComponent label="À propos" customClass="home-apropos">
                <div className="content">
                    <AProposHome/>
                    <ExploreButton text={"Lire plus"}/>
                </div>

            </SectionComponent>

            <SectionComponent label="Portefolio" customClass="home-portefolio">
                <div className="content">
                    <PortefoliosHome/>
                    <ExploreButton text={"Parcourir"}/>
                </div>
            </SectionComponent>

            <SectionComponent label="Contact" customClass="home-contact">
                <div className="content">
                    <ContactForm/>
                    <ExploreButton text={"Transmettre"}/>
                </div>
            </SectionComponent>

            <Medias color={"dark"}/>
        </div>
    )
}