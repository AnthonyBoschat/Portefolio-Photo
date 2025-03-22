import { setZoomPhoto } from "@Redux/Slices/zoom"
import { useDispatch } from "react-redux"

export default function usePhoto(){

    const dispatch = useDispatch()

    const zoomPhoto = (collection, photoIndex) => {
        dispatch(setZoomPhoto({collection:collection, photoIndex:photoIndex}))
    }


    return {
        zoomPhoto
    }
}