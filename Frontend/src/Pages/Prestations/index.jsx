import PrestationsLayout from "@Layout/Prestations";
import { useSelector } from "react-redux";



export default function PrestationPage({prestationID = null, name=null}){


    const { collections }               = useSelector(store => store.prestations)
    const artisans                      = useSelector(store => store.artisans.collections)         
    const prestation                    = collections.find(collection => collection?.id === prestationID)
    const banners                       = prestation?.photos?.filter(photo => photo.banner)

    

    return(
        <PrestationsLayout 
            prestation={prestation}
            banners={banners}
            artisans={artisans}
        />
    )
}