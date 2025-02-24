import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";

export default function ExploreButton({text, onClick, navigate, inline = false, style}){

    const {desktop} = useSelector(store => store.app)

    if(inline){
        return(
            <span id="redirect-button-container" style={{display:"inline"}}>
                {(!navigate && onClick)&& (
                    <button style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!inline ? "line" : ""}`} onClick={() => onClick()}>{text}</button>
                )}
                {navigate && (
                    <Link style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!inline ? "line" : ""}`} to={navigate}>{text}</Link>
                )}
            </span>
        )
    }else{
        return(
            <div id="redirect-button-container">
                {(!navigate && onClick)&& (
                    <button style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!inline ? "line" : ""}`} onClick={() => onClick()}>{text}</button>
                )}
                {navigate && (
                    <Link style={style ? {...style} : {}} className={`${desktop ? "desktop" : "mobile"} ${!inline ? "line" : ""}`} to={navigate}>{text}</Link>
                )}
            </div>
        )
    }
}