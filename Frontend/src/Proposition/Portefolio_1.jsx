import { Link } from "react-router-dom";
import "./style.scss";
import Galery from "@Components/Galery";
import LazyImage from "@Components/LazyImage";

export default function PortefolioProposition1({portefolioCategory}){



    return(
        <>
            <Galery
                id="proposition1-main"
                elements={portefolioCategory}
                hoverEffect
                render={(category) => (
                    <>
                        <Link to={category.link}>
                            <LazyImage src={category.representant} alt={`Photo représentative du portefolio '${category.label}'`} />
                        </Link>
                        <h2>{category.label}</h2>
                    </>
                )}
            />
        </>
    )
}