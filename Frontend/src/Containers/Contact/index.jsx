import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import ContactForm from "./Form"
import ExploreButton from "@Components/ExploreButton"
import { resetFormData } from "@Redux/Slices/Contact"
import ENDPOINT from "@Constants/Endpoint"
import csrfFetch from "@Services/csrfCookie"
import { keyframes } from "framer-motion"

export default function ContactContainer(){

    const formData = useSelector(store => store.contact.formData)
    const dispatch = useDispatch()
    const formRef = useRef()

   

    // Réinitialise le formulaire à chaque fois que le composant est monté
    useEffect(() => {
        dispatch(resetFormData())
    }, [])

    const sendMail = () => {
        formRef.current.reportValidity()
        const sendFormData = new FormData()
        for(const key in formData){
            sendFormData.append(key, formData[key])
        }
        console.log("formData", formData)
        csrfFetch(ENDPOINT.sendEmail, {
            method:"POST",
            body:sendFormData,
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
    }

    return(
        <>
            <ContactForm formRef={formRef} formData={formData}/>
            <ExploreButton onClick={() => sendMail()} text={"Transmettre"}/>
        </>
    )
}