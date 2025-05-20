import PortefolioIndexLayout from "@Layout/Portefolio/index/index.jsx";
import { useSelector } from "react-redux";



export default function PortefolioIndexPage(){

    const { representants, labels }       = useSelector(store => store.portefolios);

    const extractImage  = (label) => representants?.find(representant => representant?.name === label)?.image;
    const extractID     = (label) => representants?.find(representant => representant?.name === label)?.id
    
    
    const representantsPortefolios = labels.map(label => (
        {label:label, link:`/Portefolios/${label}`, id:extractID(label), image:extractImage(label)}
    ))


    
    

    return(
        <>
            {representantsPortefolios.length > 0 && (
                <PortefolioIndexLayout representantsPortefolios={representantsPortefolios}/>
            )}
        </>
    )
}