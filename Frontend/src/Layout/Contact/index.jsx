import ContactContainer from "@Containers/Contact";
import "./style.scss"
import { useSelector } from "react-redux";
import image from "@Assets/Photos/Home/Portefolio/9.jpg"


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