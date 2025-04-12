import { Link } from "react-router-dom";
import "./style.scss";
// ©

import Medias from "@Containers/Media";
import ROUTES from "@Constants/Routes";

export default function Footer(){



    return(
        // <footer>
        //     <div className="copyright-container">
        //         <span className="signature">Jesahel Charpentier</span>
        //         <span className="copyright">Copyright© - 2025 - Tous droits réservés</span>
        //     </div>
        //     <div className="link-container">
        //         <Medias style={{gap:"1rem"}}/>
        //         <div className="separator"></div>
        //         <div className="links">
        //             <Link to={ROUTES.CONTACT}>Contact</Link>
        //             <Link>Mentions légales</Link>
        //             <Link>Politique de confidentialité</Link>
        //         </div>
        //     </div>
        // </footer>

        <footer>
            <div className="section-container">

                <div className="section">
                    <h1>Contact</h1>
                    <ul>
                        <li>jesahelcharpentier.photo@gmail.fr</li>
                        <li>Montréal, Canada</li>
                        <li><Medias style={{gap:10, justifyContent:"flex-start", paddingTop:5}}/></li>
                    </ul>
                </div>

                <div className="section">
                    <h1>Navigation</h1>
                    <ul>
                        <li><Link to={ROUTES.HOME}>Accueil</Link></li>
                        <li><Link to={ROUTES.PORTEFOLIOS.INDEX}>Portefolio</Link></li>
                        <li><Link to={ROUTES.PRESTATIONS.INDEX}>Prestations</Link></li>
                        <li><Link to={ROUTES.APROPOS}>À propos</Link></li>
                        <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
                    </ul>
                </div>

                <div className="section">
                    <h1>Informations</h1>
                    <ul>
                        <li><Link to={ROUTES.HOME}>Mentions légales</Link></li>
                        <li><Link to={ROUTES.HOME}>Politique de confidentialité</Link></li>
                    </ul>
                </div>

            </div>

            <div className="copyright-container">
                <span className="signature">JC</span>
                <span className="copyright">Copyright© - 2025 - Tous droits réservés</span>
             </div>
        </footer>
    )
}