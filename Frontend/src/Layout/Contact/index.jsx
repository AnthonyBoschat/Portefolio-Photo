import ContactContainer from "@Containers/Contact";
import "./style.scss"
import Medias from "@Containers/Media";
import { useSelector } from "react-redux";

export default function ContactLayout(){

    const {desktop} = useSelector(store => store.app)

    return(
        <>


        <div id="contact-layout-container">
            <div className="contact">
                {desktop && (
                    <picture>
                        {/* <img src="" alt="qzdqzd" /> */}
                    </picture>
                )}
                <div>
                    <ContactContainer/>
                </div>
            </div>
                <Medias color={"light"}/>
        </div>
        </>
    )
}