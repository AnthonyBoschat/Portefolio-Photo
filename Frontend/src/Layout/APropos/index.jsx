import "./style.scss";
import jesahelPhoto from "@Assets/Photos/APropos/Jesahel.jpg";
import artisanPhoto from "@Assets/Photos/APropos/artisan.jpg";
import naturalLight from "@Assets/Photos/APropos/naturalLight.jpg";


export default function AProposLayout(){



    return(
        <>
            <picture>
                <img src={jesahelPhoto} alt="" />
            </picture>
            <picture>
                <img src={naturalLight} alt="" />
            </picture>
            <picture>
                <img src={artisanPhoto} alt="" />
            </picture>
            
        </>
    )
}