import { Link } from "react-router-dom";
import "./style.scss";
// ©

import Medias from "@Containers/Media";
import ROUTES from "@Constants/Routes";

export default function Footer(){



    return(
        <footer>
            <div className="copyright-container">
                <span className="signature">Jesahel Charpentier</span>
                <span className="copyright">Copyright© - 2025 - Tous droits réservés</span>
            </div>
            <div className="link-container">
                <Medias style={{gap:"1rem"}}/>
                <div className="separator"></div>
                <div className="links">
                    <Link to={ROUTES.CONTACT}>Contact</Link>
                    <Link>Mentions légales</Link>
                    <Link>Politique de confidentialité</Link>
                </div>
            </div>
        </footer>
    )
}