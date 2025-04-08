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



// Composant charger d'afficher les photos bannières
const BannerSection = ({ bannerPhotos, children }) => (
    <div className="photos_presentation-details-container">
        <ul className="photos_presentation">
        {bannerPhotos.map((photo, index) => (
            <li key={index}>
                <LazyImage src={photo} alt="Photo bannière de présentation de la prestation" />
            </li>
        ))}
        </ul>
        {children}
    </div>
);

// Composant charger de fournir les informations de la prestation
const InformationSection = ({informations}) => {
    return(
        <ul className="details-container">
            <li>
                <img src={cameraIcon} alt="" />
                <span>{informations?.photosProvide} photos retouchées</span>
            </li>
            <li>
                <img src={clockIcon} alt="" />
                {informations?.duration?.length === 1 ? (
                <span>
                    {informations.duration[0]} heure{informations.duration[0] !== 1 && "s"} de prises de vue
                </span>
                ) : (
                <span>
                    {informations.duration[0]} à {informations.duration[1]} heures de prises de vue
                </span>
                )}
            </li>
            <li>
                <img src={dollarsIcon} alt="" />
                <span>À partir de {informations?.price} dollars</span>
            </li>
        </ul>
    )
}

// Composant charger de fournir la description de la prestation
const DescriptionSection = ({ description }) => (
    <>
        <div className="prestation-description-container">
            <p>
                {description.map((sentence, index) => (
                <span key={index}>{sentence}</span>
                ))}
            </p>
        </div>
        <ExploreButton position="center" style={{letterSpacing:"1px", marginTop:"2rem"}} navigate={ROUTES.CONTACT} text="Contact" />
    </>
);

// Composant charger de fournir les photos galeries de la prestation
const GalerySection = ({ currentRoute, galeryPhotos, setGaleryPhotos, navigate }) => {

    const {zoomPhoto} = usePhoto()
    const artisanRoute = currentRoute === ROUTES.PRESTATIONS.ARTISAN
    const photos = artisanRoute ? galeryPhotos.map((photo, index) => ({image:photo.image, orientation:index % 3 === 2 ? "paysage" : "portrait", artisan:photo.artisans[0]}))
                                : galeryPhotos.map(photo => ({image:photo.image, orientation:photo.orientation}))
                                
    return (
        <Galery
            id={artisanRoute ? "artisan-galery-container" : "photos-galery-container"}
            hoverEffect={photos.length !== 0}
            hoverScale={photos.length === 1}
            elements={photos}
            render={(element, index) => {
                if(artisanRoute){
                    return (
                        <>
                            <span className="label">{element.artisan.name}</span>
                            <Link to={`${ROUTES.ARTISAN}/${element.artisan.id}`}>
                                <LazyImage src={element.image}/>
                            </Link>
                        </>
                    )
                }
                else{
                    return <LazyImage onClick={() => zoomPhoto(photos, index)} src={element.image}/>
                }
            }}
        />
    );
};

// Disposition des composants
export default function PrestationsLayout({
  description,
  informations,
  galeryPhotos,
  setGaleryPhotos,
  bannerPhotos,
  currentRoute,
}) {
  const navigate = useNavigate();

  return (
    <>
        <div id="prestations-main-container">
            <BannerSection bannerPhotos={bannerPhotos}>
                <InformationSection informations={informations}/>
            </BannerSection>
            <DescriptionSection description={description} />
            <GalerySection
                currentRoute={currentRoute}
                galeryPhotos={galeryPhotos}
                setGaleryPhotos={setGaleryPhotos}
                navigate={navigate}
            />
        </div>
        <Footer/>
    </>
  );
}
