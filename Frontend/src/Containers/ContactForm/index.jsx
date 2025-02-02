import "./style.scss";

export default function ContactForm(){



    return(
        <form id="contact-form" action="">
            {/* Nom et prénom */}
            <div className="line">
                <div className="field">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" name="lastname" />
                </div>
                <div className="field">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" name="firstname" />
                </div>
            </div>

            {/* Adresse e-mail */}
            <div className="line">
                <div className="field">
                    <label htmlFor="">Adresse e-mail</label>
                    <input type="email" />
                </div>
            </div>

            <div className="line">
                <div className="field">
                    <label htmlFor="subject">Sujet</label>
                    <div id="select">
                        <select className="focus" name="" id="">
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
                    <textarea name="message" id="" rows={8}></textarea>
                </div>

            </div>

        </form>
    )
}