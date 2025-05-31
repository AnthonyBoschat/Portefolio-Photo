import "./style.scss";
import { useDispatch } from "react-redux";
import { setFormData } from "@Redux/Slices/Contact";
import contactOptions from "@Constants/ContactOptions";
import { SpinnerCircular } from "spinners-react";

export default function ContactForm({formRef, formData, loading}){

    const dispatch = useDispatch()


    return(
        <form ref={formRef} id="contact-form" action="">
            {/* Nom et prénom */}
            <div className="line">
                <div className="field">
                    <label htmlFor="lastname">Nom</label>
                    <input placeholder="Nom" id="lastname" className={loading ? "loading" : ""} required onChange={(e) => dispatch(setFormData({key:"lastname", value:e.target.value}))} value={formData.lastname} type="text" name="lastname" />
                </div>
                <div className="field">
                    <label style={{opacity:0}} htmlFor="firstname">Prénom</label>
                    <input placeholder="Prénom" id="firstname" className={loading ? "loading" : ""} required onChange={(e) => dispatch(setFormData({key:"firstname", value:e.target.value}))} value={formData.firstname} type="text" name="firstname" />
                </div>
            </div>

            {/* Adresse e-mail */}
            <div className="line">
                <div className="field">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input placeholder="exemple@email.com" id="email" className={loading ? "loading" : ""} required onChange={(e) => dispatch(setFormData({key:"email", value:e.target.value}))} value={formData.email} type="email" />
                </div>
            </div>

            <div className="line">
                <div className="field">
                    <label htmlFor="subject">Sujet</label>
                    <div id="select">
                        <select className={loading ? "loading" : ""} onChange={(e) => dispatch(setFormData({key:"subject", value:e.target.value}))} defaultValue={formData.subject} name="" id="">
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
                    <div className="textarea-container">
                        <textarea placeholder="" id="message" className={loading ? "loading" : ""} required onChange={(e) => dispatch(setFormData({key:"message", value:e.target.value}))} value={formData.message} name="message" rows={8}></textarea>
                        {loading && (
                            <div className="loadingIcon">
                                <SpinnerCircular size={30} color="white"/>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </form>
    )
}