import LazyImage from "@Components/LazyImage";
import "./style.scss";
import Medias from "@Containers/Media";
import { useSelector } from "react-redux";
import Footer from "@Containers/Footer";


export default function AProposLayout({aproposPhoto}){

    const {desktop, mobile} = useSelector(store => store.app)

    return(
        <div id="apropos-container">
            {mobile && (
                <>
                    <div className="section white">
                        {mobile && (<LazyImage src={aproposPhoto.jesahelPhoto} alt={"Photo de la photographe Jesahel"}/>)}
                        {/* {desktop && (<img loading="lazy" src={aproposPhoto.jesahelPhoto} alt={"Photo de la photographe Jesahel"}></img>)} */}
                        <p>
                            <span>Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile.</span>
                            <span>Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.</span>
                        </p>
                    </div>
                    <div className="section black">
                        <p>
                            <span>Mon approche est simple : prendre le temps.</span>
                            <span>Je m’assure que chaque séance se déroule dans une ambiance détendue et chaleureuse, pour que tout le monde se sente à l’aise.</span>
                            <span>J’aime débuter nos rencontres autour d’un café ou d’une petite collation, histoire d’apprendre à vous connaître avant de commencer.</span>
                        </p>
                    </div>
                    <div className="section white reverse">
                        {mobile && (<LazyImage src={aproposPhoto.naturalLight} alt={"Photo d'extérieur en lumière naturelle"}/>)}
                        {/* {desktop && (<img src={aproposPhoto.naturalLight} alt={"Photo d'extérieur en lumière naturelle"}></img>)} */}
                        <p>
                            <span>Je privilégie la lumière naturelle pour la spontanéité et les surprises qu’elle offre.</span>
                            <span>Pour moi, les variations imprévisibles de la météo ou de la luminosité apportent une touche unique à chaque cliché.</span>
                            <span>Je suis particulièrement attachée aux portraits : à travers eux, j’aime transmettre ma vision et offrir aux autres une perspective différente d’eux-mêmes.</span>
                        </p>
                    </div>  
                    <div className="section black">
                        <p>
                            <span>Mon parcours n’a pas toujours été linéaire. Après un début dans l’esthétique, une école de maquillage professionnel et des expériences en tant que maquilleuse dans le théâtre, le cinéma et la mode, j’ai découvert la photographie.</span>
                            <span>Ce fut une révélation, et depuis, je me suis formée en autodidacte à la photographie et à la retouche.</span>
                        </p>
                    </div>
                    <div className="section white">
                        {mobile && (<LazyImage src={aproposPhoto.artisanPhoto} alt={"Photo représentative de la sensibilisation à l'écologie"}/>)}
                        {/* {desktop && (<img src={aproposPhoto.artisanPhoto} alt={"Photo représentative de la sensibilisation à l'écologie"}></img>)} */}
                        <p>
                            <span>Ce qui me motive chaque jour, c’est l’envie d’apprendre, de rencontrer de nouvelles histoires, et de sublimer les moments et les personnes que je photographie.</span>
                            <span>Passionnée d’art et sensible à l’écologie, je m’efforce d’allier créativité et respect de notre environnement dans tout ce que je fais.</span>
                        </p>
                    </div>
                </>
            )}
            {desktop && (
                <>
                    <div className="section white">
                        <div className="presentation">
                            <section>
                                <h2>Qui suis-je ?</h2>
                                <p>
                                    <span>Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile.</span>
                                    <span>Depuis toujours, l’art est ma manière de m’exprimer, et la photographie est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.</span>
                                    <span>Ce qui me motive chaque jour, c’est l’envie d’apprendre, de rencontrer de nouvelles histoires, et de sublimer les moments et les personnes que je photographie.  </span>
                                    <span>Passionnée d’art et sensible à l’écologie, je m’efforce d’allier créativité et respect de notre environnement dans tout ce que je fais.</span>
                                </p>
                            </section>
                            <section>
                                <h2>Ma philosophie</h2>
                                <p>
                                    <span>Mon approche est simple : prendre le temps.</span>
                                    <span>Je m’assure que chaque séance se déroule dans une ambiance détendue et chaleureuse, pour que tout le monde se sente à l’aise.  J’aime débuter nos rencontres autour d’un café ou d’une petite collation, histoire d’apprendre à vous connaître avant de commencer.</span>
                                </p>
                            </section>
                        </div>
                        <div className="image">
                            <img loading="lazy" src={aproposPhoto.jesahelPhoto} alt={"Photo de la photographe Jesahel"}></img>
                        </div>
                    </div>

                    <div className="section black">
                        <div className="image">
                            <img src={aproposPhoto.naturalLight} alt={"Photo d'extérieur en lumière naturelle"}></img>
                        </div>
                        <div className="presentation">
                            <section>
                                <h2>Ma vision artistique</h2>
                                <p>
                                    <span>Je privilégie la lumière naturelle pour la spontanéité et les surprises qu’elle offre. Pour moi, les variations imprévisibles de la météo ou de la luminosité apportent une touche unique à chaque cliché. </span>
                                    <span>Je suis particulièrement attachée aux portraits : à travers eux, j’aime transmettre ma vision et offrir aux autres une perspective différente d’eux-mêmes.</span>
                                </p>
                            </section>
                            <section>
                                <h2>Mon histoire</h2>
                                <p>
                                    <span>Mon parcours n’a pas toujours été linéaire.</span>
                                    <span>Après un début dans l’esthétique, une école de maquillage professionnel et des expériences en tant que maquilleuse dans le théâtre, le cinéma et la mode, j’ai découvert la photographie. Depuis, je me suis formée en autodidacte à la photographie et à la retouche.</span>
                                </p>
                            </section>
                        </div>
                    </div>
                </>
            )}
            <Footer/>
            {/* <Medias style={{paddingTop:"5rem", paddingBottom:"2rem"}} color={"lighter"}/> */}
        </div>
    )
}