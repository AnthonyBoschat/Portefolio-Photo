// Home
import prestation1 from "./photos/home/prestation/1.webp"
import prestation2 from "./photos/home/prestation/2.webp"
import prestation3 from "./photos/home/prestation/3.webp"
import prestationhighquality from "./photos/home/prestation/4.jpg"

import portefolio1 from "./photos/home/portefolio/1.webp"
import portefolio2 from "./photos/home/portefolio/2.webp"
import portefolio3 from "./photos/home/portefolio/3.webp"

import bannerPortrait1 from "./photos/prestation/portrait/1.webp"
import bannerPortrait2 from "./photos/prestation/portrait/2.webp"
import bannerPortrait3 from "./photos/prestation/portrait/3.webp"

import bannerArtisan1 from "./photos/prestation/artisan/1.webp"
import bannerArtisan2 from "./photos/prestation/artisan/2.webp"
import bannerArtisan3 from "./photos/prestation/artisan/3.webp"

import bannerBoudoir1 from "./photos/prestation/boudoir/1.webp"
import bannerBoudoir2 from "./photos/prestation/boudoir/2.webp"
import bannerBoudoir3 from "./photos/prestation/boudoir/3.webp"

import aproposJesahel from "./photos/apropos/jesahel.jpg"
import aproposNaturalLight from "./photos/apropos/naturalLight.jpg"
import aproposArtisan from "./photos/apropos/artisan.webp"



const STATIC_PHOTOS = {
    HOME:{
        PRESTATION:{
            PORTRAIT:prestation1,
            PORTRAIT_HIGHTQUALITY:prestationhighquality,
            ARTISAN:prestation2,
            BOUDOIR:prestation3,
        },
        PORTEFOLIO:[
            portefolio1,
            portefolio2,
            portefolio3
        ],
        PORTEFOLIO_DESKTOP:[
            {image:bannerPortrait2, orientation:"portrait"},
            {image:portefolio1, orientation:"paysage"},
            {image:bannerBoudoir1, orientation:"portrait"},
            {image:bannerPortrait1, orientation:"portrait"},
            {image:aproposNaturalLight, orientation:"portrait"},
            {image:prestation3, orientation:"portrait"},
            {image:portefolio2, orientation:"paysage"},
            {image:bannerPortrait3, orientation:"portrait"},
        ]
    },

    PRESTATION:{
        PORTRAIT:{
            BANNER:[
                bannerPortrait1,
                bannerPortrait2,
                bannerPortrait3,
            ]
        },
        ARTISAN:{
            BANNER:[
                bannerArtisan1,
                bannerArtisan2,
                bannerArtisan3,
            ]
        },
        BOUDOIR:{
            BANNER:[
                bannerBoudoir1,
                bannerBoudoir2,
                bannerBoudoir3,
            ]
        },
    },

    APROPOS:{
        JESAHEL:aproposJesahel,
        NATURAL_LIGHT:aproposNaturalLight,
        ARTISAN:aproposArtisan,
    }
}

export default STATIC_PHOTOS