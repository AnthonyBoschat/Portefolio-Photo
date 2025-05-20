import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PrestationsIndexLayout from "@Layout/Prestations/index/index.jsx";


export default function PrestationsIndexPage(){

    const routes = useSelector(store => store.routes.routes)
    const [prestationsCategory, setPrestationsCategory] = useState([])

    useEffect(() => {
        if(routes){
            const portefolios = routes.find(route => route.label === "Prestations")
            setPrestationsCategory(portefolios.children)
        }
    }, [routes])
    

    return(
        <>
            {prestationsCategory.length > 0 && (
                <PrestationsIndexLayout prestationsCategory={prestationsCategory}/>
            )}
        </>
    )
}