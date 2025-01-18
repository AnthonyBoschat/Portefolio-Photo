import { useEffect, useRef, useState } from "react";
import "./style.scss";
import logo from "@Assets/logo.svg"
import { useDispatch } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";

export default function Header(){

    const dispatch = useDispatch()
    const headerRef = useRef()
    const [scrolling, setScrolling] = useState(false)


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
        <header className={scrolling ? "active" : ""} ref={headerRef}>
            <img src={logo} alt="Logo du site internet" />

            <svg onClick={() => dispatch(setOpenPhoneMenu(true))} id="menu" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5H21M4.75 9H21M8.5 16.5H21"/>
            </svg>

        </header>
    )
}