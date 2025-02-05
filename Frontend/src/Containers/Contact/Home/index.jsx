import { useRef, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@Redux/Slices/Contact";

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
                        <select onChange={(e) => dispatch(setFormData({key:"subject", value:parseInt(e.target.value)}))} defaultValue={formData.subject} name="" id="">
                            <option value={0}>Prise de contact</option>
                            <option value={1}>Devis</option>
                            <option value={2}>Proposition d'évènement</option>
                            <option value={3}>Collaboration</option>
                            <option value={4}>Autre</option>
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