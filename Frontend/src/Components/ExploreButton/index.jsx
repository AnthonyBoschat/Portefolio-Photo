import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";

export default function ExploreButton({text, onClick, navigate, style, position = "center"}){

    const {desktop} = useSelector(store => store.app)

    
    return(
        <div id="redirect-button-container" className={`${position}`}>
            {(!navigate && onClick)&& (
                <button style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"}`} onClick={() => onClick()}>{text}</button>
            )}
            {navigate && (
                <Link style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"}`} to={navigate}>{text}</Link>
            )}
        </div>
    )
    
}