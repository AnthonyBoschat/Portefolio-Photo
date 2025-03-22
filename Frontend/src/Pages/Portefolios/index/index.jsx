import PortefolioIndexLayout from "@Layout/Portefolio/index/index.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function PortefolioIndexPage(){

    const routes = useSelector(store => store.routes.routes)
    const [portefolioCategory, setPortefolioCategory] = useState([])

    useEffect(() => {
        if(routes){
            const portefolios = routes.find(route => route.label === "Portefolio")
            setPortefolioCategory(portefolios.children)
        }
    }, [routes])
    

    return(
        <>
            {portefolioCategory.length > 0 && (
                <PortefolioIndexLayout portefolioCategory={portefolioCategory}/>
            )}
        </>
    )
}