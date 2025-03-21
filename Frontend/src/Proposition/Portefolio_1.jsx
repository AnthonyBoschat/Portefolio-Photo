import { Link } from "react-router-dom";
import "./style.scss";

export default function PortefolioProposition1({portefolioCategory}){



    return(
        <ul id="proposition1-main">
            {portefolioCategory.map((category, index) => (
                <li key={index} className="category-container">
                    <Link to={category.link}>
                        <img src={category.representant} alt={`Photo représentative du poretfolio '${category.label}'`} />
                    </Link>
                    <h2>{category.label}</h2>
                </li>
            ))}
        </ul>
    )
}