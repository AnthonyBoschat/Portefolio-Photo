import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import useRoutes from "@Services/useRoutes";

export default function ExploreButton({text, onClick, navigate, style, position = "center"}){

    const {desktop} = useSelector(store => store.app)
    const {navigateTo} = useRoutes()

    
    return(
        <div id="redirect-button-container" className={`${position}`}>
            {(!navigate && onClick)&& (
                <button style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"}`} onClick={() => onClick()}>{text}</button>
            )}
            {navigate && (
                <button onClick={() => navigateTo(navigate)} style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"}`} >{text}</button>
            )}
        </div>
    )
    
}