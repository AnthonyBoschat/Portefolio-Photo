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
                <div>
                    <ContactContainer/>
                </div>
                {desktop && (
                    <picture>
                        {/* <img src="" alt="qzdqzd" /> */}
                    </picture>
                )}
            </div>
            <div className="contact-media">
                <Medias color={"light"}/>
            </div>
        </div>
        </>
    )
}