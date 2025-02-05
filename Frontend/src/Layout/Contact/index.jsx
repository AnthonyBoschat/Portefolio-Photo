import ContactForm from "@Containers/Contact/Home";
import ExploreButton from "@Components/ExploreButton";
import "./style.scss";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function ContactLayout(){

    const formData = useSelector(store => store.contact.formData)
    const formRef = useRef()

    return(
        <div id="contact-main-layout">
            <ContactForm formRef={formRef} formData={formData}/>
            <ExploreButton onClick={() => sendMessage(formRef, formData)} text={"Transmettre"}/>
        </div>
    )
}