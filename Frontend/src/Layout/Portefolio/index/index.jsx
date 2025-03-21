import LazyImage from "@Components/LazyImage";
import "./style.scss";
import { Link } from "react-router-dom";
import PortefolioProposition1 from "@Proposition/Portefolio_1";

export default function PortefolioIndexLayout({portefolioCategory}){

    

    return(

        // <div id="portefolio-index-main-container">
        //     <ul className="portefolio-list">
        //         {portefolioCategory.map(portefolioType => (
            //             <li>
            //                 <h1>{portefolioType.label}</h1>
            //                 <Link to={portefolioType.link}>
            //                     <LazyImage src={portefolioType.representant}/>
            //                 </Link>
            //             </li>
            //         ))}
            //     </ul>
            // </div>
            
            
        // PROPOSITION 1 PORTEFOLIO INDEX
        <PortefolioProposition1 portefolioCategory={portefolioCategory}/>
        
    )
}