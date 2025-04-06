import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ContactForm from "./Form"
import ExploreButton from "@Components/ExploreButton"
import { resetFormData } from "@Redux/Slices/Contact"
import ENDPOINT from "@Constants/Endpoint"
import csrfFetch from "@Services/csrfCookie"

export default function ContactContainer(){

    const formData = useSelector(store => store.contact.formData)
    const dispatch = useDispatch()
    const formRef = useRef()
    const emailSendReportRef = useRef()

    const [loading, setLoading] = useState(false)
    const [emailSend, setEmailSend] = useState(false)
   

    // Réinitialise le formulaire à chaque fois que le composant est monté
    useEffect(() => {
        dispatch(resetFormData())
    }, [])

    useEffect(() => {
        if(emailSend){
            setTimeout(() => {
                emailSendReportRef.current.classList.add("fadeout")

                setTimeout(() => {
                    setEmailSend(false)
                    
                }, 200);
            }, 5000);
        }
    }, [emailSend])

    const sendMail = () => {
        // setLoading(true)
        if(formRef.current.reportValidity()){
            const sendFormData = new FormData()
            for(const key in formData){
                sendFormData.append(key, formData[key])
            }
            csrfFetch(ENDPOINT.sendEmail, {
                method:"POST",
                body:sendFormData,
            })
            .then(response => response.json())
            .then(result => {
                if(result.success){
                    setEmailSend(true)
                    // setLoading(false)
                    dispatch(resetFormData(true))
                }
            })
        }
    }

    return(
        <>
            <ContactForm loading={loading} formRef={formRef} formData={formData}/>
            <ExploreButton position="right" onClick={() => sendMail()} text={"Transmettre"}/>
            <div  className="email-send-report-container">
                {emailSend && (
                <span ref={emailSendReportRef}>Message envoyé !</span>
            )}
            </div>
        </>
    )
}