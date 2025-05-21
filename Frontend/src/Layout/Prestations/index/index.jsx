import LazyImage from "@Components/LazyImage";
import "./style.scss";
import { Link } from "react-router-dom";
import Galery from "@Components/Galery";

export default function PrestationsIndexLayout({representantsPrestations}){

    

    return(
        
            
        <Galery
            id="prestation-index"
            elements={representantsPrestations}
            hoverEffect
            render={(prestation) => (
                <>
                    <Link to={prestation.link}>
                        <LazyImage src={prestation.image} alt={`Photo représentative de la prestation '${prestation.label}'`} />
                    </Link>
                    <h2>{prestation.label}</h2>
                </>
            )}
        />
        
    )
}