import "./style.scss";

export default function ExploreButton({text, onClick}){



    return(
        <div id="redirect-button-container">
            <button onClick={() => onClick()}>{text}</button>
        </div>
    )
}