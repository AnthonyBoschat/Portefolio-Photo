import { useRef, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@Redux/Slices/Contact";
import contactOptions from "@Constants/ContactOptions";

export default function ContactForm({formRef, formData}){

    const dispatch = useDispatch()


    return(
        <form ref={formRef} id="contact-form" action="">
            {/* Nom et prénom */}
            <div className="line">
                <div className="field">
                    <label htmlFor="lastname">Nom</label>
                    <input required onChange={(e) => dispatch(setFormData({key:"lastname", value:e.target.value}))} value={formData.lastname} type="text" name="lastname" />
                </div>
                <div className="field">
                    <label htmlFor="firstname">Prénom</label>
                    <input required onChange={(e) => dispatch(setFormData({key:"firstname", value:e.target.value}))} value={formData.firstname} type="text" name="firstname" />
                </div>
            </div>

            {/* Adresse e-mail */}
            <div className="line">
                <div className="field">
                    <label htmlFor="">Adresse e-mail</label>
                    <input required onChange={(e) => dispatch(setFormData({key:"email", value:e.target.value}))} value={formData.email} type="email" />
                </div>
            </div>

            <div className="line">
                <div className="field">
                    <label htmlFor="subject">Sujet</label>
                    <div id="select">
                        <select onChange={(e) => dispatch(setFormData({key:"subject", value:e.target.value}))} defaultValue={formData.subject} name="" id="">
                            {contactOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>

            </div>

            <div className="line">
                <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea required onChange={(e) => dispatch(setFormData({key:"message", value:e.target.value}))} value={formData.message} name="message" id="" rows={8}></textarea>
                </div>

            </div>

        </form>
    )
}