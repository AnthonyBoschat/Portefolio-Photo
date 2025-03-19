import { useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import logo from "@Assets/logo.svg"
import { Link, useLocation } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import BreadCrumbs from "@Components/BreadCumbs";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Header({introductionImageRef}){

    const {pathname} = useLocation()
    const [introductionIsVisible, setIntroductionIsVisible] = useState(pathname === "/")

    const {mobile, desktop} = useSelector(store => store.app)
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

    useEffect(() => {
        let observer;
        let timer;
      
        // On ne fait rien si on n'est pas sur la home
        if (pathname !== "/") {
          setIntroductionIsVisible(false);
          return;
        }
      
        const checkAndObserve = () => {
          if (introductionImageRef?.current) {
            // Vérification immédiate : on met à jour l'état selon la position actuelle
            const rect = introductionImageRef.current.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            setIntroductionIsVisible(isVisible);
      
            // Mise en place de l'Intersection Observer
            observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  setIntroductionIsVisible(entry.isIntersecting);
                });
              },
              { threshold: 0.1 }
            );
            observer.observe(introductionImageRef.current);
          } else {
            // Si la référence n'est pas encore prête, on réessaie après 100ms
            timer = setTimeout(checkAndObserve, 100);
          }
        };
      
        checkAndObserve();
      
        return () => {
          if (observer) observer.disconnect();
          clearTimeout(timer);
        };
      }, [pathname, introductionImageRef]);

    const containerClasses = useMemo(() => {
        return `container 
        ${!scrolling && pathname === "/" && desktop ? "hidden" : ""} 
        ${scrolling ? "active" : ""} 
        ${mounted ? "" : "no-transition"}
        ${introductionIsVisible ? "transparentStyle" : ""}`
    }, [introductionIsVisible, mounted, scrolling, pathname, desktop])


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