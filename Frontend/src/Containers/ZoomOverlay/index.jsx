import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { deactivateZoomOverlay, nextPhoto, previousPhoto } from "@Redux/Slices/zoom";
import { useEffect, useRef, useState } from "react";

export default function ZoomOverlay(){

    const containerRef = useRef(null)
    const dispatch = useDispatch()
    const {active, photoURL, last, first} = useSelector(store => store.zoom)
    const closeButtonRef = useRef(null)
    const imageRef = useRef(null)
    const arrowLeftRef = useRef(null)
    const arrowRightRef = useRef(null)

    const closeOverlay = (e) => {
        if(
            e.target !== closeButtonRef.current &&
            e.target !== imageRef.current &&
            e.target !== arrowLeftRef.current &&
            e.target !== arrowRightRef.current 
        ){
            dispatch(deactivateZoomOverlay())
        }
    }

    return(
        <div ref={containerRef} onClick={closeOverlay} className={active ? "active" : ""}  id="zoom-overlay-main-container">
            <div  className="overlay-element">
                <div className="close-container">
                    <i ref={closeButtonRef} onClick={() => dispatch(deactivateZoomOverlay())} className="fa-solid fa-xmark"></i>
                </div>
                
                <img ref={imageRef} src={photoURL} alt="Photo actuellement zoomer par l'utilisateur" />
                <div className="navigation">
                    <i ref={arrowLeftRef} onClick={!first ? () => dispatch(previousPhoto()) : null} className={`fa-solid fa-arrow-left ${first ? "disabled" : ""}`}></i>
                    <i ref={arrowRightRef} onClick={!last ? () => dispatch(nextPhoto()) : null} className={`fa-solid fa-arrow-right ${last ? "disabled" : ""}`}></i>
                </div>
            </div>
        </div>
    )
}