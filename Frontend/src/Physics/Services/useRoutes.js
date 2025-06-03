import { setPageDirectionConfig } from "@Redux/Slices/routes"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

export default function useRoutes(){

    const {pathname}        = useLocation()
    const {currentRoute}    = useSelector(store => store.routes)
    const navigate          = useNavigate()
    const dispatch          = useDispatch()

    const rightOrLeftOrder      = [
        "/",
        "/Portefolios",
        "/Prestations",
        "/APropos",
        "/Contact",
        "/MentionsLegales",
        "/PolitiqueDeConfidentialite"
    ]

    const subOrder = {
        Portefolios:[
            "/Collaboration Artistique",
            "/Fantastique",
            "/Lumière Naturelle",
            "/Retouche Créatives",
            "/Nu - Lingerie",
            "/Studio"
        ],
        Prestations:[
            "/Portrait",
            "/Boudoir",
            "/Artisan",
        ]
    }

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



    const pageDirectionConfig = async(pathFrom, pathTo) => {
        if(pathTo === "/"){
            return {
                initial_x:"0rem",
                initial_y:"0rem",
                exit_x:"2rem",
                exit_y:"0rem",
            }
        }else{
            const truncate_pathname         = "/" + decodeURIComponent(pathFrom.split("/")[1]);
            const truncate_previousRoute    = "/" + decodeURIComponent(pathTo.split("/")[1]);
            const previousRouteOrderIndex   = rightOrLeftOrder.findIndex(route => route === truncate_previousRoute)
            const pathnameOrderIndex        = rightOrLeftOrder.findIndex(route => route === truncate_pathname)

            if((pathnameOrderIndex === -1 || previousRouteOrderIndex === -1)){
                return{
                    initial_x:"0rem",
                    initial_y:"0rem",
                    exit_x:"0rem",
                    exit_y:"0rem",
                }
            }
            if(previousRouteOrderIndex === pathnameOrderIndex){
                if(truncate_pathname === "/Prestations" || truncate_pathname === "/Portefolios"){
                    const key = truncate_pathname === "/Prestations" ? "Prestations" : "Portefolios"
                    const sub_truncate_pathname         = "/" + decodeURIComponent(pathFrom.split("/")[2]);
                    const sub_truncate_previousRoute    = "/" + decodeURIComponent(pathTo.split("/")[2]);
                    const sub_previousRouteOrderIndex   = subOrder[key].findIndex(route => route === sub_truncate_previousRoute)
                    const sub_pathnameOrderIndex        = subOrder[key].findIndex(route => route === sub_truncate_pathname)
                    if(sub_previousRouteOrderIndex === -1 || sub_pathnameOrderIndex === -1){
                        return{
                            initial_x:"0rem",
                            initial_y:"0rem",
                            exit_x:"0rem",
                            exit_y:"0rem",
                        }
                    }
                    if(sub_previousRouteOrderIndex > sub_pathnameOrderIndex){
                        return{
                            initial_x:"0rem",
                            initial_y:"4rem",
                            exit_x:"0rem",
                            exit_y:"-4rem",
                        }
                    }
                    if(sub_previousRouteOrderIndex < sub_pathnameOrderIndex){
                        return{
                            initial_x:"0rem",
                            initial_y:"-4rem",
                            exit_x:"0rem",
                            exit_y:"4rem",
                        }
                    }
                }
                return{
                    initial_x:"0rem",
                    initial_y:"0rem",
                    exit_x:"0rem",
                    exit_y:"-4rem",
                }
            }
            if(previousRouteOrderIndex > pathnameOrderIndex){
                return{
                    initial_x:"2rem",
                    exit_x:"-2rem"
                }
            }
            if(previousRouteOrderIndex < pathnameOrderIndex){
                return{
                    initial_x:"-2rem",
                    exit_x:"2rem"
                }
            }
            return{
                initial_x:"0rem",
                exit_x:"-2rem"
            }
        }
    }

    const navigateTo = async (link) => {
        const value = await pageDirectionConfig(pathname, link)
        dispatch(setPageDirectionConfig(value))

        if(currentRoute === link){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
            setTimeout(() => {
                navigate(link)
            }, 10);
        }
    }


    return{
        isSelectedRoute,
        navigateTo
    }
}