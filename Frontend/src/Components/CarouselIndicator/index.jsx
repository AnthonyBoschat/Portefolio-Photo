import { useEffect, useMemo, useState } from "react";
import "./style.scss";

export default function CarouselIndicator({array}){

    {/* Trois indicateurs */}
    const points = useMemo(() => {
        if(array.length > 2){
            return([
                {selected:array[0]?.selected === true},
                {selected:array[0]?.selected === false && array[array.length - 1]?.selected === false},
                {selected:array[array.length - 1]?.selected === true},
            ])
        }else if (array.length === 2){
            return([
                {selected:array[0]?.selected === true},
                {selected:array[array.length - 1]?.selected === true},
            ])
        }
    }, [array])


    {/* Autant d'indicateur que de photo */}
    // useEffect(() => {
    //     if(array && points){
    //         console.table(array)
    //         console.table(points)
    //         if(array[0]?.selected){
    //             setPoints((current, index) => [...current, current.selected = index === 0])
    //         }else if(array[array.length - 1]?.selected){
    //             setPoints((current, index) => [...current, current.selected = index === 1])
    //         }else{
    //             setPoints((current, index) => [...current, current.selected = index === 2])
    //         }
    //     }
    // }, [array])

    if(array.length > 1){
        return(
            <div id="caret-carousel-container">
    
                {/* Trois indicateurs */}
                {points.map((point, index) => (
                    <span key={index} className={`caret ${point.selected ? "selected" : ""}`}></span>
                ))}
    
                {/* Autant d'indicateur que de photo */}
                {/* {array.map((element, index) => ( */}
                    {/* <span key={index} className={`${condition(element) ? "selected" : "unselected"} caret`}></span> */}
                {/* ))} */}
            </div>
        )
    }else{
        return(<></>)
    }
}