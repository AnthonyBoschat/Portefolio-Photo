import LazyImage from "@Components/LazyImage";
import "./style.scss";
import { useSelector } from "react-redux";

const sections = {
    univers:{
        title:"Mon univers",
        text:[
            "Je m'appelle Jésahel, et je suis photographe, maquilleuse professionnelle et artisane textile.",
            "Depuis toujours, l’art est ma manière de m’exprimer. La photographie, en particulier, est devenue mon moyen préféré d’extérioriser mes émotions et de capturer la beauté unique de chaque instant.",
            "Ce qui me motive chaque jour, c’est l’envie de rencontrer de nouvelles histoires, de sublimer les moments et les personnes que je photographie.",
            "Passionnée d’art et sensible à l’écologie, j’essaie d’allier créativité et respect de notre environnement dans tout ce que je fais."
        ]
    },
    travail:{
        title:"Ma façon de travailler",
        text:[
            "Je prends le temps.",
            "Pour moi, chaque séance doit se dérouler dans une ambiance détendue et chaleureuse, pour que chacun se sente pleinement à l’aise.",
            "J’aime commencer nos rencontres autour d’un café ou d’une petite collation, pour créer du lien et apprendre à vous connaître avant même de sortir l’appareil photo.",
        ]
    },
    vision:{
        title:"Ma vision artistique",
        text:[
            "Je privilégie la lumière naturelle pour sa spontanéité, ses surprises. J’aime les variations imprévisibles de météo ou de luminosité : elles rendent chaque cliché unique.",
            "Je suis particulièrement attachée aux portraits. À travers eux, je cherche à offrir aux autres une perspective différente d’eux-mêmes, telle que je les vois."
        ]
    },
    parcours:{
        title:"Mon parcours",
        text:[
            "Mon chemin n’a pas été tout tracé.",
            "Après un début dans l’esthétique, une école de maquillage professionnel et plusieurs années comme maquilleuse dans le théâtre, le cinéma et la mode, j’ai découvert la photographie. Ce fut une révélation.",
            "Depuis, je me suis formée en autodidacte, en photo comme en retouche, avec curiosité et passion — et surtout, l’envie de toujours continuer à apprendre.",
        ]
    }
}


export default function AProposLayout({aproposPhoto}){

    const {desktop, mobile} = useSelector(store => store.app)

    const generateContent = (text_array) => text_array.map((text, index) => <span key={index}>{text}</span>)

    return(
        <div id="apropos-container">
            {mobile && (
                <>
                    <div className="section white">
                        {mobile && (<LazyImage src={aproposPhoto.jesahelPhoto} alt={"Photo de la photographe Jesahel"}/>)}
                        <p>
                            {generateContent(sections.univers.text)}
                        </p>
                    </div>
                    <div className="section black">
                        <p>
                            {generateContent(sections.travail.text)}
                        </p>
                    </div>
                    <div className="section white reverse">
                        {mobile && (<LazyImage src={aproposPhoto.naturalLight} alt={"Photo d'extérieur en lumière naturelle"}/>)}
                        <p>
                            {generateContent(sections.vision.text)}
                        </p>
                    </div>  
                    <div className="section black">
                        <p>
                            {generateContent(sections.parcours.text)}
                        </p>
                    </div>
                    <div className="section white">
                        {mobile && (<LazyImage src={aproposPhoto.artisanPhoto} alt={"Photo représentative de la sensibilisation à l'écologie"}/>)}
                    </div>
                </>
            )}
            {desktop && (
                <>
                    <div className="section white">
                        <div className="presentation">
                            <section>
                                <h2>{sections.univers.title}</h2>
                                <p>
                                    {generateContent(sections.univers.text)}
                                </p>
                            </section>
                            <section>
                                <h2>{sections.travail.title}</h2>
                                <p>
                                    {generateContent(sections.travail.text)}
                                </p>
                            </section>
                        </div>
                        <div className="image">
                            <img loading="lazy" src={aproposPhoto.jesahelPhoto} alt={"Photo de la photographe Jesahel"}></img>
                        </div>
                    </div>

                    <div className="section black">
                        <div className="background"></div>
                        <div className="image">
                            <img src={aproposPhoto.naturalLight} alt={"Photo d'extérieur en lumière naturelle"}></img>
                        </div>
                        <div className="presentation">
                            <section>
                                <h2>{sections.vision.title}</h2>
                                <p>
                                    {generateContent(sections.vision.text)}
                                </p>
                            </section>
                            <section className="black">
                                <h2>{sections.parcours.title}</h2>
                                <p>
                                    {generateContent(sections.parcours.text)}
                                </p>
                            </section>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}