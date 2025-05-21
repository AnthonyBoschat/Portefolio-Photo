import "./style.scss";

import cameraIcon from "@Assets/icons/camera.svg";
import clockIcon from "@Assets/icons/clock.svg";
import dollarsIcon from "@Assets/icons/dollars.svg";
import ROUTES from "@Constants/Routes";
import ExploreButton from "@Components/ExploreButton";
import Carousel from "@Components/Carousel";
import LazyImage from "@Components/LazyImage";
import { Link, useNavigate } from "react-router-dom";
import Galery from "@Components/Galery";
import usePhoto from "@Services/usePhoto";
import Footer from "@Containers/Footer";
import { useEffect, useState } from "react";
import sortByPhotoType from "@Services/sortByPhotoType";



// Composant charger d'afficher les photos bannières
const BannerSection = ({ banners, children }) => (
    <div className="photos_presentation-details-container">
        <ul className="photos_presentation">
        {banners.map((banner, index) => (
            <li key={index}>
                <LazyImage src={banner.image} alt="Photo bannière de présentation de la prestation" />
            </li>
        ))}
        </ul>
        {children}
    </div>
);

// Composant charger de fournir les informations de la prestation
const InformationSection = ({prestation}) => {

    const formatPrice = (price) => {
        const amount = parseFloat(price.replace(',', '.'))
        return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2)
    }

    return(
        <ul className="details-container">
            <li>
                <img src={cameraIcon} alt="" />
                <span>{prestation?.delivery} photos retouchées</span>
            </li>
            <li>
                <img src={clockIcon} alt="" />
                <span>
                    {prestation?.duration} heures de prises de vue
                </span>
            </li>
            <li>
                <img src={dollarsIcon} alt="" />
                <span>À partir de {formatPrice(prestation?.price)} dollars</span>
            </li>
        </ul>
    )
}

// Composant charger de fournir la description de la prestation
const DescriptionSection = ({ description }) => {

    return(
        <>
            <div className="prestation-description-container">
                <p>
                    {description.split(/\r?\n/).map((sentence, index) => (
                        <span key={index}>{sentence}</span>
                    ))}
                </p>
            </div>
            <ExploreButton position="center" style={{letterSpacing:"1px", marginTop:"2rem"}} navigate={ROUTES.CONTACT} text="Contact" />
        </>
    )
}

// Composant charger de fournir les photos galeries de la prestation
const GalerySection = ({ prestation, artisans }) => {

    const {zoomPhoto}               = usePhoto()
    const [datas, setDatas]         = useState([])
    const isArtisan                 = prestation?.artisans !== null

    useEffect(() => {
        if(isArtisan){
            const final_artisans    = []

            artisans.map((artisan, index) => {

                const item          = {}
                item.name           = artisan?.name
                item.id             = artisan?.id
                item.image          = artisan?.photos.find(photo => photo.representant)?.image
                item.orientation    = index % 3 === 2 ? "paysage" : "portrait"

                final_artisans.push(item)
            })

            setDatas(final_artisans)
        }else{
            setDatas(sortByPhotoType(prestation?.photos.filter(photo => !photo.banner && !photo.representant)))
        }
    }, [isArtisan, prestation, artisans])
                                
    return (
        <Galery
            id={isArtisan ? "artisan-galery-container" : "photos-galery-container"}
            hoverEffect={datas.length !== 0}
            hoverScale={datas.length === 1}
            elements={datas}
            render={(element, index) => {
                if(isArtisan){
                    console.log("debug element", element)
                    return (
                        <>
                            <span className="label">{element.name}</span>
                            <Link to={`${ROUTES.ARTISAN}/${element.name}`}>
                                <LazyImage src={element.image}/>
                            </Link>
                        </>
                    )
                }
                else{
                    return <LazyImage onClick={() => zoomPhoto(datas, index)} src={element.image}/>
                }
            }}
        />
    );
};

// Disposition des composants
export default function PrestationsLayout({prestation, artisans, banners}) {

    console.log(prestation?.description)

  return (
    <>
        <div id="prestations-main-container">
            <BannerSection banners={banners}>
                <InformationSection prestation={prestation}/>
            </BannerSection>
            <DescriptionSection description={prestation?.description} />
            <GalerySection
                prestation={prestation}
                artisans={artisans}
            />
        </div>
    </>
  );
}
