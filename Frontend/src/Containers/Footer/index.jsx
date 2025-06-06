import { Link, useLocation } from "react-router-dom";
import "./style.scss";
import Medias from "@Containers/Media";
import ROUTES from "@Constants/Routes";
import { useSelector } from "react-redux";
import useRoutes from "@Services/useRoutes";
import logo from "@Assets/logo.png"

export default function Footer(){

    const {pathname}                    = useLocation()
    const {routes}                      = useSelector(store => store.routes)
    const {desktop}                     = useSelector(store => store.app)
    const {isSelectedRoute, navigateTo} = useRoutes()

    const selectedRouteClassName = (route) => (isSelectedRoute(route.link) || route.open) ? "selected" : "" 

    return(

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

                {desktop && (
                    <div className="section">
                        <h1>Navigation</h1>
                        <ul>
                            {routes.map(route => (
                                <li onClick={() => navigateTo(route.link)} key={route.label}><button className={selectedRouteClassName(route)}>{route.label}</button></li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="section">
                    <h1>Informations</h1>
                    <ul>
                        <li><button onClick={() => navigateTo(ROUTES.MENTION_LEGAL)} className={`${pathname === ROUTES.MENTION_LEGAL ? "selected" : ""}`} >Mentions légales</button></li>
                        <li><button onClick={() => navigateTo(ROUTES.POLITICS)} className={`${pathname === ROUTES.POLITICS ? "selected" : ""}`}>Politique de confidentialité</button></li>
                    </ul>
                </div>

            </div>

            <div className="copyright-container">
                <picture className="signature">
                    <img className="logo" src={logo} alt="Logo du site internet" />
                </picture>
                <span className="copyright">Copyright© - 2025 - Tous droits réservés</span>
             </div>
        </footer>
    )
}