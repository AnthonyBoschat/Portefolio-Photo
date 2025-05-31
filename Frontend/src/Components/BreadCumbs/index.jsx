import "./style.scss";

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function BreadCrumbs(){

    const currentRoute = useSelector(store => store.routes.currentRoute)
    const routes = useSelector(store => store.routes.routes)

    // Etat du fil d'ariane
    const [breadcrumbs, setBreadcrumbs] = useState({
        first:null,
        second:null
    })

    // Génère le fil d'ariane
    useEffect(() => {
        console.log(routes)
        console.log(currentRoute)
        console.log(decodeURIComponent(currentRoute))

        const firstLevelRoute = routes.find(route => route.link === decodeURIComponent(currentRoute))
        if(firstLevelRoute){
            if(firstLevelRoute.link === "/"){
                setBreadcrumbs({
                    first:null,
                    second:null
                })
            }else{
                setBreadcrumbs({
                    first:null,
                    second:firstLevelRoute.label
                })
            }
        }else{
            const secondLevelRoute = routes.find(route => route.children && route.children.find(child => child.link === decodeURIComponent(currentRoute)))
            if(secondLevelRoute){
                setBreadcrumbs({
                    first:secondLevelRoute.label,
                    second:secondLevelRoute.children.find(child => child.link === decodeURIComponent(currentRoute)).label
                })
            }
        }
    }, [currentRoute])

    return(
        <div id="breadcrumbs-container">
            {breadcrumbs.first 
                ? <span className="first">{breadcrumbs.first}</span> 
                : <span className="first invisible">_</span>
            }
            {breadcrumbs.second 
                ? <span className="second">{breadcrumbs.second}</span> 
                : <span className="second invisible">_</span>
            }
        </div>
    )
}