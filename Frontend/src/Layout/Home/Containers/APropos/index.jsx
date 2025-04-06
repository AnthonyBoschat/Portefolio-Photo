import LazyImage from "@Components/LazyImage";
import "./style.scss";
import ExploreButton from "@Components/ExploreButton";
import ROUTES from "@Constants/Routes";
import { useSelector } from "react-redux";


export default function AProposHome({aproposPhoto}){


    const {desktop, mobile} = useSelector(store => store.app)
    
    return(
        <>
            {(mobile || desktop) && (
                <>
                    <div id="presentation">
                        <picture>
                            <LazyImage src={aproposPhoto} alt={"Photo de Jesahel Charpentier"}/>
                        </picture>
                        {mobile && (
                            <div className="presentation-container">
                                <p className="presentation">
                                    <span>Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile.</span>
                                    <span>Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.</span>
                                </p>
                                <ExploreButton position={"center"} navigate={ROUTES.APROPOS} text={"Lire plus"}/>

                            </div>
                        )}
                        {desktop && (
                            <div className="presentation-container">
                                <p className="presentation">
                                    <span>Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile.</span>
                                    <span>Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.Je m’assure que chaque séance se déroule dans une ambiance détendue et chaleureuse, pour que tout le monde se sente à l’aise.</span>
                                    <span>Ce qui me motive chaque jour, c’est l’envie d’apprendre, de rencontrer de nouvelles histoires, et de sublimer les moments et les personnes que je photographie. </span>
                                    <span>Passionnée d’art et sensible à l’écologie, je m’efforce d’allier créativité et respect de notre environnement dans tout ce que je fais.</span>
                                </p>
                                <ExploreButton navigate={ROUTES.APROPOS} text={"Lire plus"}/>
                            </div>
                        )}
                    </div>
                    {/* {mobile && (
                        <ExploreButton navigate={ROUTES.APROPOS} text={"Lire plus"}/>
                    )} */}
                </>
            )}
        </>
            
    )
}