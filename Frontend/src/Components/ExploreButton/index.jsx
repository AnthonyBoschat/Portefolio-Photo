import { Link } from "react-router-dom";
import "./style.scss";

export default function ExploreButton({text, onClick, navigate}){

    return(
        <div id="redirect-button-container">
            {(!navigate && onClick)&& (
                <button onClick={() => onClick()}>{text}</button>
            )}
            {navigate && (
                <Link to={navigate}>{text}</Link>
            )}
        </div>
    )
}