import { useEffect, useRef, useState } from "react";
import "./style.scss";
import logo from "@Assets/logo.svg"
import { useDispatch, useSelector } from "react-redux";
import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { Link } from "react-router-dom";
import ROUTES from "@Constants/Routes";

export default function Header(){

    const dispatch = useDispatch()
    const headerRef = useRef()
    const currentRoute = useSelector(store => store.routes.currentRoute)
    const routes = useSelector(store => store.routes.routes)
    
    
    const [scrolling, setScrolling] = useState(false)
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


    // Gère le fil d'ariane
    const [roadmap, setRoadmap] = useState({
        first:null,
        second:null
    })
    // Génère le fil d'ariane
    useEffect(() => {
        const firstLevelRoute = routes.find(route => route.link === currentRoute)
        if(firstLevelRoute){
            if(firstLevelRoute.link === "/"){
                setRoadmap({
                    first:null,
                    second:null
                })
            }else{
                setRoadmap({
                    first:null,
                    second:firstLevelRoute.label
                })
            }
        }else{
            const secondLevelRoute = routes.find(route => route.children && route.children.find(child => child.link === currentRoute))
            if(secondLevelRoute){
                setRoadmap({
                    first:secondLevelRoute.label,
                    second:secondLevelRoute.children.find(child => child.link === currentRoute).label
                })
            }
        }
    }, [currentRoute])


    return(
        <header ref={headerRef}>
            <div className={`container ${scrolling ? "active" : ""}`}>
                <div className="logo-roadmap-container">
                    <Link to={ROUTES.HOME}>
                        <img src={logo} alt="Logo du site internet" />
                    </Link>
                    <div className="roadmap">
                        {roadmap.first 
                            ? <span className="first">{roadmap.first}</span> 
                            : <span className="first invisible">_</span>
                        }
                        {roadmap.second 
                            ? <span className="second">{roadmap.second}</span> 
                            : <span className="second invisible">_</span>
                        }
                    </div>
            </div>
                

                <svg onClick={() => dispatch(setOpenPhoneMenu(true))} id="menu" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5H21M4.75 9H21M8.5 16.5H21"/>
                </svg>
            </div>

        </header>
    )
}