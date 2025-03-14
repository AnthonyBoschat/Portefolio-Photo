import { useEffect, useRef, useState } from "react";
import "./style.scss";
import logo from "@Assets/logo.svg"
import { Link, useLocation } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import BreadCrumbs from "@Components/BreadCumbs";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Header(){

    const {mobile, desktop} = useSelector(store => store.app)
    const {pathname} = useLocation()
    const headerRef = useRef()

    // L'utilisateur est en train de scroll ?
    const [scrolling, setScrolling] = useState(false)

    // Détermine si le composant est monté ou non
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);


    // Gère l'animation dû au scroll
    useEffect(() => {
        function handleScroll() {
            setScrolling( window.scrollY >= 25 ? true : false)
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Classes dynamique du container
    const containerClasses = `
        container 
        ${!scrolling && pathname === "/" && desktop ? "hidden" : ""} 
        ${scrolling ? "active" : ""} 
        ${mounted ? "" : "no-transition"}
    `;


    return(
        <header ref={headerRef}>
            <div className={containerClasses }>
                <div className="logo-breadcrumbs-container">
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt="Logo du site internet" />
                    </Link>
                    {mobile && (
                        <BreadCrumbs/>
                    )}
                </div>

                <Navigation/>
            </div>

        </header>
    )
}