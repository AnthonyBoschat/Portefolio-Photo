import ROUTES from "@Constants/Routes";
import "./style.scss";

import { setOpenPhoneMenu } from "@Redux/Slices/phoneState"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import useRoutes from "@Services/useRoutes";

export default function Navigation(){

    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const {mobile, desktop}             = useSelector(store => store.app)
    const {routes}                      = useSelector(store => store.routes)
    const {isSelectedRoute, navigateTo} = useRoutes()
    

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
                                            <button onClick={route.label === "Portefolio" ? () => navigateTo(ROUTES.PORTEFOLIOS.INDEX) : route.label === "Prestations" ? () => navigateTo(ROUTES.PRESTATIONS.INDEX) : undefined} className={isSelectedRoute(route.link) || route.open ? "active" : ""}>
                                                {route.label}
                                                {route.subMenu && (
                                                    <i className="fa-solid fa-caret-down"></i>
                                                )}
                                            </button>
                                            <div className="child-list">
                                                {route.children.map((route, index) => (
                                                    <button onClick={() => navigateTo(route.link)} key={index} className={isSelectedRoute(route.link) ? "active" : ""}>{route.label}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!route.subMenu && (
                                        <button onClick={() => navigateTo(route.link)} key={index} className={isSelectedRoute(route.link) ? "active" : ""}>
                                            {route.label}
                                            {route.subMenu && (
                                                <i className="fa-solid fa-caret-down"></i>
                                            )}
                                        </button>
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