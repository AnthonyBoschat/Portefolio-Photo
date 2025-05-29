import ContactContainer from "@Containers/Contact";
import "./style.scss"
import Medias from "@Containers/Media";
import { useSelector } from "react-redux";
import Footer from "@Containers/Footer";
import image from "@Assets/Photos/Home/Portefolio/1.jpg"

export default function ContactLayout(){

    const {desktop} = useSelector(store => store.app)

    return(
        <>


        <div id="contact-layout-container">
            <div className="contact">
                {desktop && (
                    <picture>
                        <img src={image} alt="qzdqzd" />
                    </picture>
                )}
                <div>
                    <ContactContainer/>
                </div>
            </div>
            
        </div>
        </>
    )
}