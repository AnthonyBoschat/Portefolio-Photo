import ROUTES from "@Constants/Routes";
import "./style.scss";

import { setOpenPhoneMenu } from "@Redux/Slices/phoneState"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom";

export default function Navigation(){

    const dispatch = useDispatch()
    const {mobile, desktop} = useSelector(store => store.app)
    const {routes, currentRoute} = useSelector(store => store.routes)
    const {pathname} = useLocation()

    const isSelectedRoute = (link) => {
        if(pathname.startsWith("/Artisan")){
            if(link === "/Prestations"){
                return true
            }
            if(link.includes("Artisan")){
                return true
            }
        }else{
            return currentRoute === link
        }

    }

    return(
        <>
            {mobile && (
                <svg onClick={() => dispatch(setOpenPhoneMenu(true))} id="phone-navigation-button" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5H21M4.75 9H21M8.5 16.5H21"/>
                </svg>
            )}

            {desktop && (
                <nav id="navigation-desktop-container">
                    {routes.map((route) => {
                        if(!route.hidden){
                            return (
                                <>
                                    {route.subMenu && (
                                        <div className="button-list-container">
                                            <button className={isSelectedRoute(route.link) || route.open ? "active" : ""}>
                                                {route.label}
                                                {route.subMenu && (
                                                    <i className="fa-solid fa-caret-down"></i>
                                                )}
                                            </button>
                                            <div className="child-list">
                                                {route.children.map(route => (
                                                    <Link className={isSelectedRoute(route.link) ? "active" : ""} to={route.link}>{route.label}</Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!route.subMenu && (
                                        <Link to={route.link} className={isSelectedRoute(route.link) ? "active" : ""}>
                                            {route.label}
                                            {route.subMenu && (
                                                <i className="fa-solid fa-caret-down"></i>
                                            )}
                                        </Link>
                                    )}
                                </>
                            )
                        }
                    })}
                </nav>
            )}
        </>
    )
}