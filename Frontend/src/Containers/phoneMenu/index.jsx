import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect, useState } from "react";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { Link, useLocation } from "react-router-dom";
import { closeSubMenu, openSubMenu } from "@Redux/Slices/routes";
import Medias from "@Containers/Media";

export default function PhoneMenuContainer(){

    const phoneMenuOpen = useSelector(store => store.phoneState.menuOpen)
    const currentRoute = useSelector(store => store.routes.currentRoute)
    const dispatch = useDispatch()
    const routes = useSelector(store => store.routes.routes)



    const isSelectedRoute = (link) => {
        if(currentRoute === link ){
            return true
        }else{
            return false
        }
    }


    useEffect(() => {
        if(phoneMenuOpen){
            
            const closePhoneMenu = (e) => {
                if(e.target.classList.contains("overlay")){
                    dispatch(setOpenPhoneMenu(false))
                    // dispatch(closeSubMenu())
                }
            }

            window.addEventListener("click", closePhoneMenu)

            return () => {
                window.removeEventListener("click", closePhoneMenu)
            }
        }
    }, [phoneMenuOpen])

  


  

    return(
        <div className={`overlay ${!phoneMenuOpen ? "pointerNone" : "" }`}>
            <nav className={`phone-menu-container ${phoneMenuOpen ? "open" : ""}`}>
                <div className="close-container">
                    <svg onClick={() => dispatch(setOpenPhoneMenu(false))} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <ul className="parentList">
                    {routes.map((route, index) => {
                        if(!route.hidden){
                            if(!route.subMenu){
                                return(
                                    <li className={`${isSelectedRoute(route.link) ? "focus" : ""}`} key={index}>
                                        <Link to={route.link}>{route.label}</Link>
                                    </li>
                                )
                            }
                            if(route.subMenu){
                                return(
                                    <li className={`${(currentRoute === route.label || route.open) ? "focus" : ""}`} onClick={() => dispatch(openSubMenu(route.label))} key={index}>
                                        <span>
                                            {route.label}
                                            <i className={`fa-solid fa-angle-up ${route.open ? "reverse" : ""}`}></i>
                                            
                                        </span>
    
                                        <ul className={`childrenList ${route.open ? "open" : ""}`}>
                                            {route.children.map((childRoute, index) => (
                                                <li className={`${isSelectedRoute(childRoute.link) ? "focus" : ""}`} key={index}>
                                                    <Link to={childRoute.link}>{childRoute.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
                    <Medias color={"light"}/>
            </nav>
        </div>
    )
}