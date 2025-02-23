import "./style.scss";

import { setOpenPhoneMenu } from "@Redux/Slices/phoneState"
import { useDispatch } from "react-redux"

export default function Navigation(){

    const dispatch = useDispatch()


    return(
        <svg onClick={() => dispatch(setOpenPhoneMenu(true))} id="phone-navigation-button" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5H21M4.75 9H21M8.5 16.5H21"/>
        </svg>
    )
}