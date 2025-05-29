import ROUTES from "@Constants/Routes"
import MentionsLayout from "@Layout/Legal/Mentions"
import PoliticsLayout from "@Layout/Legal/Politics"
import { useLocation } from "react-router-dom"

export default function LegalPage(){

    const {pathname} = useLocation()

    if(pathname === ROUTES.POLITICS){
        return <PoliticsLayout/>
    }
    if(pathname === ROUTES.MENTION_LEGAL){
        return <MentionsLayout/>
    }
}