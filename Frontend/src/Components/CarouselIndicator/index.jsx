import "./style.scss";

export default function CarouselIndicator({array, condition}){



    return(
        <div id="caret-carousel-container">
            {array.map((element, index) => (
                <span key={index} className={`${condition(element) ? "selected" : "unselected"} caret`}></span>
            ))}
        </div>
    )
}