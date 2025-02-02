import "./style.scss";

export default function Medias({color}){

    // Ajouter le lien de redirection
    const mediaButtons = [
        {icon:<i className="fa-brands fa-facebook"></i>},
        {icon:<i className="fa-brands fa-instagram"></i>},
        {icon:<i className="fa-brands fa-pinterest"></i>},
    ]

    return(
        <div id="medias-container">
            {mediaButtons.map((media, index) => (
                <a key={index} target="_blank" className={`${color}`}>
                    {media.icon}
                </a>
            ))}
        </div>
    )
}