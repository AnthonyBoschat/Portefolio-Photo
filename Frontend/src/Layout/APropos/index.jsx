import "./style.scss";
import jesahelPhoto from "@Assets/Photos/APropos/Jesahel.jpg";
import artisanPhoto from "@Assets/Photos/APropos/artisan.jpg";
import naturalLight from "@Assets/Photos/APropos/naturalLight.jpg";
import Medias from "@Containers/Media";
import { useMemo } from "react";


export default function AProposLayout(){

    const photos = useMemo(() => ({
        jesahelPhoto:jesahelPhoto,
        artisanPhoto:artisanPhoto,
        naturalLight:naturalLight
    }), [])

    return(
        <div id="apropos-main-container">
            <div className="section white">
                <picture>
                    <img src={photos.jesahelPhoto} alt="" />
                </picture>
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
            <div className="section white">
                <picture>
                    <img src={photos.naturalLight} alt="" />
                </picture>
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
                <picture>
                    <img src={photos.artisanPhoto} alt="" />
                </picture>
                <p>
                    <span>Ce qui me motive chaque jour, c’est l’envie d’apprendre, de rencontrer de nouvelles histoires, et de sublimer les moments et les personnes que je photographie.</span>
                    <span>Passionnée d’art et sensible à l’écologie, je m’efforce d’allier créativité et respect de notre environnement dans tout ce que je fais.</span>
                </p>
            </div>
            <div className="section black small">
                <Medias/>
            </div>
            
        </div>
    )
}