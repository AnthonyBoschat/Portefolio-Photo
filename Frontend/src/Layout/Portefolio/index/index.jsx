import LazyImage from "@Components/LazyImage";
import "./style.scss";
import { Link } from "react-router-dom";
import Galery from "@Components/Galery";

export default function PortefolioIndexLayout({portefolioCategory}){

    

    return(
        
            
        <Galery
            id="portefolio-index"
            elements={portefolioCategory}
            hoverEffect
            render={(category) => (
                <>
                    {category?.banner?.image && (
                        <>
                        <Link to={category.link}>
                            <LazyImage src={category.banner.image} alt={`Photo représentative du portefolio '${category.label}'`} />
                        </Link>
                        <h2>{category.label}</h2>
                        
                        </>

                    )}
                </>
            )}
        />
        
    )
}