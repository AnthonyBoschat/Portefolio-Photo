import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";

export default function ExploreButton({text, onClick, navigate, noLine = false, style}){

    const {desktop} = useSelector(store => store.app)

    return(
        <div id="redirect-button-container" style={noLine ? {display:"inline"} : {}}>
            {(!navigate && onClick)&& (
                <button style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!noLine ? "line" : ""}`} onClick={() => onClick()}>{text}</button>
            )}
            {navigate && (
                <Link style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!noLine ? "line" : ""}`} to={navigate}>{text}</Link>
            )}
        </div>
    )
}