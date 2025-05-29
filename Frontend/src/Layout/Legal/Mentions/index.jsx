import "../style.scss";
import logo from "@Assets/logo.png"

export default function MentionsLayout(){



    return(
        <div id="legal-main-container">
            <div className="container">

                <div className="title-container">
                    <div>
                        <h1>Mentions légales</h1>
                        <span>Dernière mise à jour : 30/05/2025</span>
                    </div>
                </div>

                <ul className="sections-container">
                    <li className="section">
                        <h2>Propriétaire du site</h2>
                        <p>
                            <span>
                                Nom : Jésahel Charpentier<br/>
                                Statut : Entreprise individuelle<br/>
                                Courriel : <span className="detail">jésahel.charpentier@gmail.fr</span>
                            </span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Activité</h2>
                        <p>
                            <span>Ce site présente les services photographiques proposés par Jésahel Charpentier, incluant la présentation de son portfolio, les offres de prestations et un formulaire de contact.</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Hébergement du site</h2>
                        <p>
                            <span>Ce site est hébergé chez PlanetHoster, Canada (Montréal)</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Propriété intellectuelle</h2>
                        <p>
                            <span>L’ensemble des éléments présents sur ce site (textes, images, photographies, logo, design, etc.) sont la propriété exclusive de Jésahel Charpentier, sauf mention contraire.</span>
                            <span>Toute reproduction, diffusion, modification ou exploitation sans autorisation écrite est strictement interdite.</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Liens externes</h2>
                        <p>
                            <span>Ce site peut contenir des liens vers d'autres sites. Nous ne sommes pas responsables du contenu ou des politiques de confidentialité de ces sites.</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Législation applicable</h2>
                        <p>
                            <span>Ce site est soumis aux lois en vigueur dans la province de Québec et au droit Canadien.</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Contact</h2>
                        <p>
                            <span>Pour toute question relative à ces mentions, vous pouvez nous contacter à <span className="detail">jesahel.charpentier@gmail.com</span></span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Conception et développement</h2>
                        <p>
                            <span>Ce site a été conçu et développé par Anthony Boschat, pour en savoir plus : {" "}
                                <span className="detail">
                                    <a 
                                        target="_blank" 
                                        href="https://www.linkedin.com/in/anthony-boschat-0ab240283/"
                                        aria-label="Profil professionnel d'Anthony Boschat"
                                        >Me découvrir</a>
                                </span>
                            </span>
                        </p>
                    </li>
                </ul>


                <div className="logo-container">
                    <picture>
                        <img src={logo} alt="Logo du site internet" />
                    </picture>

                </div>

            </div>
        </div>
    )
}