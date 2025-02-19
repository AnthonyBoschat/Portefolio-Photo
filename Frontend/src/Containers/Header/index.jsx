import { useEffect, useRef, useState } from "react";
import "./style.scss";
import logo from "@Assets/logo.svg"
import { useDispatch, useSelector } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { Link } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import BreadCrumbs from "@Components/BreadCumbs";
import Navigation from "./Navigation";

export default function Header(){

    const dispatch = useDispatch()
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
            <div className={`container ${scrolling ? "active" : ""}`}>
                <div className="logo-breadcrumbs-container">
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt="Logo du site internet" />
                    </Link>
                    <BreadCrumbs/>
                </div>

                <Navigation/>
            </div>

        </header>
    )
}