import "./style.scss";
import introductionImage from "./introduction.jpg"
import { useEffect, useState } from "react";
import { transform } from "framer-motion";

export default function IntroductionContainer(){

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

    const zoomStyle = {
        transform: "scale(" + (1 + offset / 3000) + ")"
    }

    const textOpacity = Math.max(1 - offset / 600, 0);


    return(
        <div id="home-introduction">
            <img src={introductionImage} style={zoomStyle} />
            <h1 style={{ opacity: textOpacity }}>
                Bienvenue dans mon univers<br/> photographique.
            </h1>
        </div>
    )
}