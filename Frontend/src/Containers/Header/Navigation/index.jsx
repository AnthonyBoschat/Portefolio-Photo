import ROUTES from "@Constants/Routes";
import "./style.scss";

import { setOpenPhoneMenu } from "@Redux/Slices/phoneState"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

export default function Navigation(){

    const dispatch = useDispatch()
    const {mobile, desktop} = useSelector(store => store.app)
    const {routes, currentRoute} = useSelector(store => store.routes)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    

    const isSelectedRoute = (link) => {
        if(pathname.startsWith("/Artisan")){
            if(link === "/Prestations"){
                return true
            }
            if(link.includes("Artisan")){
                return true
            }
        }else{
            return decodeURIComponent(currentRoute) === link
        }

    }

    const navigateTo = (routeLink) => {
        if(currentRoute === routeLink){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
            navigate(routeLink)
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
                    {routes.map((route, index) => {
                        if(!route.hidden){
                            return (
                                <React.Fragment key={index}>
                                    {route.subMenu && (
                                        <div key={index} className="button-list-container">
                                            <button onClick={route.label === "Portefolio" ? () => navigate(ROUTES.PORTEFOLIOS.INDEX) : route.label === "Prestations" ? () => navigate(ROUTES.PRESTATIONS.INDEX) : undefined} className={isSelectedRoute(route.link) || route.open ? "active" : ""}>
                                                {route.label}
                                                {route.subMenu && (
                                                    <i className="fa-solid fa-caret-down"></i>
                                                )}
                                            </button>
                                            <div className="child-list">
                                                {route.children.map((route, index) => (
                                                    <Link onClick={() => navigateTo(route.link)} key={index} className={isSelectedRoute(route.link) ? "active" : ""} to={route.link}>{route.label}</Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!route.subMenu && (
                                        <Link onClick={() => navigateTo(route.link)} key={index} to={route.link} className={isSelectedRoute(route.link) ? "active" : ""}>
                                            {route.label}
                                            {route.subMenu && (
                                                <i className="fa-solid fa-caret-down"></i>
                                            )}
                                        </Link>
                                    )}


                                </React.Fragment>

                            )
                        }
                    })}
                </nav>
            )}
        </>
    )
}