import LazyImage from "@Components/LazyImage";
import "./style.scss";
import { Link } from "react-router-dom";
import Galery from "@Components/Galery";

export default function PortefolioIndexLayout({representantsPortefolios}){

    

    return(
        
            
        <Galery
            id="portefolio-index"
            elements={representantsPortefolios}
            hoverEffect
            render={(portefolio) => (
                <>
                    {portefolio?.image && (
                        <>
                        <Link to={portefolio.link}>
                            <LazyImage src={portefolio.image} alt={`Photo représentative du portefolio '${portefolio.label}'`} />
                        </Link>
                        <h2>{portefolio.label}</h2>
                        
                        </>

                    )}
                </>
            )}
        />
        
    )
}