import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useEffect, useState } from "react";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";

export default function PhoneMenuContainer(){

  const phoneMenuOpen = useSelector(store => store.phoneState.menuOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    if(phoneMenuOpen){
        
        const closePhoneMenu = (e) => {
            if(e.target.classList.contains("overlay")){
                dispatch(setOpenPhoneMenu(false))
            }
        }

        window.addEventListener("click", closePhoneMenu)

        return () => {
            window.removeEventListener("click", closePhoneMenu)
        }
    }
  }, [phoneMenuOpen])

  const [routes, setRoutes] = useState([
    {label:"Accueil", link:"", subMenu:false},
    {label:"Portefolio", subMenu:true, open:false, children:[
        {label:"Portrait", link:""},
        {label:"Nu", link:""},
        {label:"Noir et blanc", link:""},
    ]},
    {label:"Prestations", subMenu:true, open:false, children:[
        {label:"Portrait", link:""},
        {label:"Artisan", link:""},
        {label:"Boudoir", link:""},
    ]},
    {label:"Contact", link:"", subMenu:false},
  ])

  

  const toggleSubMenu = (routeLabel) => {
    const newRoutesState = routes.map(route => {
        if(route.label === routeLabel){
            route.open = !route.open
        }
        return route
    })
    setRoutes(newRoutesState)
  }
  

    return(
        <div className={`overlay ${!phoneMenuOpen ? "pointerNone" : "" }`}>
            <nav className={`phone-menu-container ${phoneMenuOpen ? "open" : ""}`}>
                <div className="close-container">
                    <svg onClick={() => dispatch(setOpenPhoneMenu(false))} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <ul className="parentList">
                    {routes.map((route, index) => {
                        if(!route.subMenu){
                            return(
                                <li key={index}>
                                    <a href="">{route.label}</a>
                                </li>
                            )
                        }
                        if(route.subMenu){
                            return(
                                <li className={`${route.open ? "focus" : ""}`} onClick={() => toggleSubMenu(route.label)} key={index}>
                                    <span>
                                        {route.label}
                                        <i className={`fa-solid fa-angle-up ${route.open ? "reverse" : ""}`}></i>
                                        
                                    </span>

                                    <ul className={`childrenList ${route.open ? "open" : ""}`}>
                                        {route.children.map((childRoute, index) => (
                                            <li>
                                                <a href="">{childRoute.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        }
                    })}
                </ul>
            </nav>
        </div>
    )
}