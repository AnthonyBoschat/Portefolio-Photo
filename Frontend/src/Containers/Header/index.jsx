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

    const [scrolling, setScrolling] = useState(false) // L'utilisateur est en train de scroll ?

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


    return(
        <header ref={headerRef}>
            <div className={`container ${(!scrolling && pathname === "/") ? "hidden" : ""} ${scrolling ? "active" : ""}`}>
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