import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export default function useRoutes(){

    const {pathname}        = useLocation()
    const {currentRoute}    = useSelector(store => store.routes)
    const navigate          = useNavigate()

    const isSelectedRoute = (link) => {
        if(pathname.startsWith("/Artisan")){
            if(link === "/Prestations"){
                return true
            }
            if(link.includes("Artisan")){
                return true
            }
        }else{
            return decodeURIComponent(currentRoute) === link
        }
    }

    const navigateTo = (link) => {
        if(currentRoute === link){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
            navigate(link)
        }
    }


    return{
        isSelectedRoute,
        navigateTo
    }
}