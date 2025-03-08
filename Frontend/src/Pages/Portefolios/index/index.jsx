import PortefolioIndexLayout from "@Layout/Portefolio/index/index.jsx";
import collab from "@Constants/StaticPhotos/photos/portefolio/index/collab.jpg";
import fantastique from "@Constants/StaticPhotos/photos/portefolio/index/fantastique.jpg";
import lumiereNaturelle from "@Constants/StaticPhotos/photos/portefolio/index/lumiereNaturelle.jpg";
import nu from "@Constants/StaticPhotos/photos/portefolio/index/nu.jpg";
import retouche from "@Constants/StaticPhotos/photos/portefolio/index/retouche.jpg";
import studio from "@Constants/StaticPhotos/photos/portefolio/index/studio.jpg";
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

    useEffect(() => {
        console.log(portefolioCategory)
    }, [portefolioCategory])
    

    return(
        <>
            {portefolioCategory.length > 0 && (
                <PortefolioIndexLayout portefolioCategory={portefolioCategory}/>
            )}
        </>
    )
}