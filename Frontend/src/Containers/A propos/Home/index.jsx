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
                            {/* <img src={aproposPhoto} alt="" /> */}
                        </picture>
                        <p className="presentation">
                            <span className="long">
                                <span>
                                    Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile. 
                                </span>
                                <span>
                                    Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.
                                </span>
                                {desktop && (
                                    <>
                                        <span>Je m’assure que chaque séance se déroule dans une ambiance détendue et chaleureuse, pour que tout le monde se sente à l’aise.</span>
                                        <span></span>
                                    </>
                                )}
                            </span>
                            <span className="end">
                                {mobile && (
                                    <span>
                                        Je m'assure que chaque séance se ... 
                                    </span>
                                )}
                                {desktop && (
                                    <span>
                                        J’aime débuter nos rencontres autour d'un ... <ExploreButton style={{letterSpacing:"2px", fontSize:"16px"}} noLine={true} navigate={ROUTES.APROPOS} text={"Lire plus"}/>
                                    </span>
                                )}
                            </span>
                        </p>
                    </div>
                    {mobile && (
                        <ExploreButton navigate={ROUTES.APROPOS} text={"Lire plus"}/>
                    )}
                </>
            )}
            {/* {desktop && (
                <>

                </>
            )} */}
        </>
            
    )
}