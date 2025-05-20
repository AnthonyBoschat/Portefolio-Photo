import "./style.scss";
// import introductionImage from "./introduction1.jpg"
// import introductionImage from "./introduction2.jpg"
// import introductionImage from "./introduction3.jpg"
import introductionImage from "./introduction4.jpg"
import { useEffect, useState } from "react";
import { RxDoubleArrowDown } from "react-icons/rx";

export default function IntroductionContainer({firstElementRef, introductionImageRef}){

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        // Fonction qui met à jour l'état offset lors du scroll
        const handleScroll = () => {
            setOffset(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        // Cleanup lors du démontage du composant
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const transformStyle = {
        transform: `translateY( -${offset / 1.5}px`,
        height: `calc(100vh -${offset}px)`
    }

    const textOpacity = Math.max(1 - offset / 600, 0);


    return(
        <div ref={introductionImageRef} id="home-introduction" style={transformStyle}>
            <picture>
                <img src={introductionImage}/>

                <h1 style={{ opacity: textOpacity }}>
                    Bienvenue dans mon univers<br/> photographique.
                </h1>
                <RxDoubleArrowDown onClick={() => firstElementRef.current.scrollIntoView({behavior:"smooth"})} style={{opacity:textOpacity}} />
            </picture>
            {/* <i className="fa-solid fa-arrow-down"></i> */}
        </div>
    )
}