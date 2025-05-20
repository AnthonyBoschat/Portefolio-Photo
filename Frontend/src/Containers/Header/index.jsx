import { useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
// import logo from "@Assets/logo1.svg"
import logo from "@Assets/logo2.png"
// import logo from "@Assets/logo2.svg"
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import BreadCrumbs from "@Components/BreadCumbs";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

export default function Header({introductionImageRef}){

    const headerRef = useRef()
    const {pathname} = useLocation()
    const {mobile, desktop} = useSelector(store => store.app)
    const [introductionIsVisible, setIntroductionIsVisible] = useState(desktop ? pathname === "/" : false)
    const navigate = useNavigate()


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

    const navigateTo = (routeLink) => {
      if(currentRoute === routeLink){
          window.scrollTo({top: 0, behavior: 'smooth'})
      }else{
          navigate(routeLink)
      }
  }


    return(
        <header ref={headerRef}>
            <div className={containerClasses }>
                <div className="logo-breadcrumbs-container">
                    <Link onClick={() => navigateTo(ROUTES.HOME)} to={ROUTES.HOME}>
                        <picture className="logo-container">
                          <img className="logo" src={logo} alt="Logo du site internet" />
                        </picture>
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