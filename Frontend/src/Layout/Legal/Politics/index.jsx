import "../style.scss";
import logo from "@Assets/logo.png"

export default function PoliticsLayout(){



    return(
        <div id="legal-main-container">
            <div className="container">

                <div className="title-container">
                    <div>
                        <h1>Politique de confidentialité</h1>
                        <span>Dernière mise à jour : 30/05/2025</span>
                    </div>
                </div>

                <p className="introduction-container">
                    Ce site internet est géré par Jésahel Charpentier. La présente politique vise à vous informer de la manière dont vos renseignements personnels sont collectés, utilisés, conservés et protégés lorsque vous utilisez notre formulaire de contact.
                </p>

                <ul className="sections-container">
                    <li className="section">
                        <h2>Données collectées</h2>
                        <p>
                            <span>Lorsque vous remplissez le formulaire de contact, nous recueillons les renseignements suivants :</span>
                            <span className="list">
                                <span>• Adresse courriel (obligatoire)</span>
                                <span>• Nom et prénom (facultatif)</span>
                                <span>• Le message que vous souhaitez nous transmettre</span>
                            </span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Finalité de la collecte</h2>
                        <p>
                            <span>Ces renseignements sont recueillis uniquement dans le but de :</span>
                            <span className="list">
                                <span>• Répondre à votre demande de contact</span>
                                <span>• Échanger avec vous, si nécessaire, pour un devis ou des informations sur nos services</span>
                            </span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Conservation des données</h2>
                        <p>
                            <span>Vos données sont envoyées par courriel à jesahel.charpentier@gmail.com et ne sont pas stockées dans une base de données automatisée.</span>
                            <span>Nous ne conservons vos informations que le temps nécessaire pour répondre à votre message, sauf si une relation contractuelle s’établit par la suite (ex : prestation photo).</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Confidentialité des données</h2>
                        <p>
                            <span>Les informations que vous nous transmettez sont traitées de manière confidentielle. Nous ne partageons jamais vos données personnelles avec des tiers, sauf obligation légale.</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Protection des données</h2>
                        <p>
                            <span>Conformément à la Loi sur la protection des renseignements personnels (PIPEDA), vous avez le droit :</span>
                            <span className="list">
                                <span>• D’accéder aux renseignements que nous détenons sur vous</span>
                                <span>• De demander leur correction ou leur suppression</span>
                            </span>
                            <span>Pour exercer ces droits, veuillez nous écrire à <span className="detail">jesahel.charpentier@gmail.com</span></span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Hébergement du site</h2>
                        <p>
                            <span>Ce site est hébergé chez PlanetHoster, Canada (Montréal)</span>
                        </p>
                    </li>
                    <li className="section">
                        <h2>Contact</h2>
                        <p>
                            <span>Pour toute question relative à cette politique, vous pouvez nous contacter à <span className="detail">jesahel.charpentier@gmail.com</span></span>
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