import "./style.scss";

export default function Medias({color, style}){

    // Ajouter le lien de redirection
    const mediaButtons = [
        {icon:<i className="fa-brands fa-facebook"></i>, path:"https://www.facebook.com/profile.php?id=61554691559110"},
        {icon:<i className="fa-brands fa-instagram"></i>, path:"https://www.instagram.com/_art_echo_/"},
        {icon:<i className="fa-brands fa-pinterest"></i>, path:"https://fr.pinterest.com/ArtEchoCraft"},
    ]

    return(
        <div style={style} id="medias-container" className={`${color}`}>
            {mediaButtons.map((media, index) => (
                <a key={index} href={media.path} target="_blank" className={`${color}`}>
                    {media.icon}
                </a>
            ))}
        </div>
    )
}