import "./style.scss";

export default function Galery({
    elements = [], 
    id,
    hoverEffect=false, 
    hoverScale = false,
    render,
}){

    return(
        <ul id={id} className={`galery-container ${hoverEffect ? "hoverEffect" : ""} ${hoverScale ? "hoverScale" : ""}`}>
            {elements.map((element, index) => (
                <li className={`photo-container ${element.orientation}`} key={index}>
                    {render(element, index)}
                </li>
            ))}
        </ul>
    )

    
}