import { useEffect, useMemo, useState } from "react";
import "./style.scss";

export default function BackToTopButton(){

    const distance = 500
    const [scrolling, setScrolling] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY >= distance ? true : false)
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const isScrollingClassName = useMemo(() => scrolling ? "scrolling" : "" , [scrolling])


    return(
        <>
            <button onClick={scrollToTop} className={isScrollingClassName} id="backToTopButton-main-container">
                <i className="fa-solid fa-arrow-up"></i>
            </button>
            
        </>
    )
}