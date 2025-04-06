import "./style.scss";
import SectionComponent from "@Components/Section";

import ContactForm from "@Containers/Contact/Form";
import ExploreButton from "@Components/ExploreButton";
import PrestationsHome from "@Layout/Home/Containers/Prestations";
import AProposHome from "@Layout/Home/Containers/APropos";
import Medias from "@Containers/Media";
import { useDispatch, useSelector } from "react-redux";
import ContactContainer from "@Containers/Contact";
import ROUTES from "@Constants/Routes";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { openSubMenuForce } from "@Redux/Slices/routes";
import Galery from "@Components/Galery";
import { useRef, useState } from "react";
import LazyImage from "@Components/LazyImage";
import usePhoto from "@Services/usePhoto";



export default function HomeLayout({
    prestationsPhotos,
    portefolioPhotos,
    aproposPhoto,
    firstElementRef
}){

    const {mobile, desktop} = useSelector(store => store.app)
    const dispatch = useDispatch()
    const {zoomPhoto} = usePhoto()

    return(
        <>
            <div id="home-main-layout" ref={firstElementRef}>


                <SectionComponent style={{marginTop:"70px"}} label="Prestations" customClass="home-prestation">
                    <div className="content">
                        <PrestationsHome prestationsPhotos={prestationsPhotos}/>
                    </div>
                </SectionComponent>
                
                <SectionComponent label="À propos" customClass="home-apropos">
                    <div className="content">
                        <AProposHome aproposPhoto={aproposPhoto}/>
                    </div>

                </SectionComponent>

                <SectionComponent label="Portefolio" customClass="home-portefolio">
                    <div className="content">
                        {mobile && (
                            <>
                                <Galery
                                    id={"home-portefolio-galery"}
                                    elements={portefolioPhotos}
                                    render={(photo) => (
                                        <LazyImage src={photo} alt={"Photo de présentation de la catégorie 'Portefolio'"}/>
                                    )}
                                />
                                <ExploreButton position={"center"} onClick={() => {
                                    dispatch(openSubMenuForce("Portefolio"))
                                    dispatch(setOpenPhoneMenu(true))
                                }} text={"Parcourir"}/>
                            </>
                        )}
                        {desktop && (
                            <>
                                <Galery
                                    id={"home-portefolio-galery"}
                                    elements={portefolioPhotos}
                                    render={(photo, index) => (
                                        <LazyImage src={photo.image}/>
                                    )}
                                />
                                <ExploreButton navigate={ROUTES.PORTEFOLIOS.INDEX} text={"Parcourir"}/>
                            </>
                        )}
                    </div>
                </SectionComponent>

                <SectionComponent label={"Contactez moi"} customClass="home-contact">
                    <div className="content">
                        {desktop && (
                            <picture>
                                {/* <img src="" alt="qzdqzd" /> */}
                            </picture>
                        )}
                        <div>
                            <ContactContainer />
                        </div>
                    </div>
                </SectionComponent>
                
            </div>
            <Medias color={"light"}/>
        </>
    )
}