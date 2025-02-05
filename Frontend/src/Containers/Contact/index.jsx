import { useRef } from "react"
import { useSelector } from "react-redux"
import ContactForm from "./Form"
import ExploreButton from "@Components/ExploreButton"

export default function ContactContainer(){

    const formData = useSelector(store => store.contact.formData)
    const formRef = useRef()

    return(
        <>
            <ContactForm formRef={formRef} formData={formData}/>
            <ExploreButton onClick={() => sendMessage(formRef, formData)} text={"Transmettre"}/>
        </>
    )
}