// Home
import prestation1 from "./photos/home/prestation/1.webp"
import prestation2 from "./photos/home/prestation/2.webp"
import prestation3 from "./photos/home/prestation/3.webp"
import prestationhighquality from "./photos/home/prestation/4.jpg"
import apropos1 from "./photos/home/apropos/1.jpg"
import portefolio1 from "./photos/home/portefolio/1.jpg"
import portefolio2 from "./photos/home/portefolio/2.jpg"
import portefolio3 from "./photos/home/portefolio/3.jpg"

const STATIC_PHOTOS = {
    HOME:{
        PRESTATION:{
            PORTRAIT:prestation1,
            PORTRAIT_HIGHTQUALITY:prestationhighquality,
            ARTISAN:prestation2,
            BOUDOIR:prestation3,
        },
        APROPOS:apropos1,
        PORTEFOLIO:[
            portefolio1,
            portefolio2,
            portefolio3
        ]
    }
}

export default STATIC_PHOTOS