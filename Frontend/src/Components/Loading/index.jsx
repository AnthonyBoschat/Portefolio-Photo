import "./style.scss";

export default function Loading({style={}}){



    return(
        <div id="loading-container">
            <i style={style} className="fa-solid fa-spinner"></i>
        </div>
    )
}