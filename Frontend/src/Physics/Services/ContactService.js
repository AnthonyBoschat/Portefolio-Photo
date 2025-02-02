import { useSelector } from "react-redux";

export function sendMessage(formRef, formData){
    const validForm = formRef.current.reportValidity()
    if(validForm){
        console.log(formData)
    }else{
        console.log("Mauvais formulaire")
    }
}