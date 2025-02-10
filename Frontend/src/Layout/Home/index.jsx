import "./style.scss";
import SectionComponent from "@Components/Section";

import ContactForm from "@Containers/Contact/Form";
import ExploreButton from "@Components/ExploreButton";
import PrestationsHome from "@Containers/Prestations/Home";
import AProposHome from "@Containers/A propos/Home";
import PortefoliosHome from "@Containers/Portefolios/Home";
import Medias from "@Containers/Media";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@Services/ContactService";
import { useEffect, useRef, useState } from "react";
import ContactContainer from "@Containers/Contact";
import { useNavigate } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { openSubMenu, openSubMenuForce } from "@Redux/Slices/routes";



export default function HomeLayout(){


    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const [test, setTest] = useState([])

    // useEffect(() => {
    //     // Assure-toi que l'URL correspond à celle de ton serveur Django
    //     fetch('http://127.0.0.1:8000/api/photos/')
    //       .then(response => response.json())
    //       .then(data => {
    //         setTest(data)
    //         console.log("debug data", data)
    //       })
    //       .catch(error => console.error('Erreur lors de la récupération des photos:', error));
    //   }, []);

    return(
        <div id="home-main-layout">

            {/* {test.map((item, index) => {
                return(
                    <img src={item.url} alt={item.url} />
                )
            })} */}


            <SectionComponent label="Prestations" customClass="home-prestation">
                <div className="content">
                    <PrestationsHome/>
                    <ExploreButton onClick={() => {
                        dispatch(openSubMenuForce("Prestations"))
                        dispatch(setOpenPhoneMenu(true))
                    }} text={"En savoir plus"}/>
                </div>
            </SectionComponent>
            
            <SectionComponent label="À propos" customClass="home-apropos">
                <div className="content">
                    <AProposHome/>
                    <ExploreButton onClick={() => navigate(ROUTES.APROPOS)} text={"Lire plus"}/>
                </div>

            </SectionComponent>

            <SectionComponent label="Portefolio" customClass="home-portefolio">
                <div className="content">
                    <PortefoliosHome/>
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