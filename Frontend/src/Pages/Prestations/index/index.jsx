import { useSelector } from "react-redux";
import PrestationsIndexLayout from "@Layout/Prestations/index/index.jsx";


export default function PrestationsIndexPage(){


    const { representants, labels } = useSelector(store => store.prestations);

    const extractImage  = (label) => representants?.find(representant => representant?.name === label)?.image;
    const extractID     = (label) => representants?.find(representant => representant?.name === label)?.id

    const representantsPrestations = labels.map(label => ({label:label, link:`/Prestations/${label}`, id:extractID(label), image:extractImage(label)}))


    return(
        <>
            {representantsPrestations.length > 0 && (
                <PrestationsIndexLayout representantsPrestations={representantsPrestations}/>
            )}
        </>
    )
}