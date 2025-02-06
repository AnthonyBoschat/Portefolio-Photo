import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import ContactForm from "./Form"
import ExploreButton from "@Components/ExploreButton"
import { resetFormData } from "@Redux/Slices/Contact"

export default function ContactContainer(){

    const formData = useSelector(store => store.contact.formData)
    const dispatch = useDispatch()
    const formRef = useRef()

    // Réinitialise le formulaire à chaque fois que le composant est monté
    useEffect(() => {
        dispatch(resetFormData())
    }, [])

    return(
        <>
            <ContactForm formRef={formRef} formData={formData}/>
            <ExploreButton onClick={() => sendMessage(formRef, formData)} text={"Transmettre"}/>
        </>
    )
}