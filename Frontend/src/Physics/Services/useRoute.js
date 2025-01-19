import { setOpenPhoneMenu } from "@Redux/Slices/phoneState";
import { setCurrentRoute } from "@Redux/Slices/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function useRoute(){

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(setOpenPhoneMenu(false))
        dispatch(setCurrentRoute(location.pathname))
    }, [location])

}