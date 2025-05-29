import sortByPhotoType from "@Services/sortByPhotoType";
import PortefolioLayout from "@Layout/Portefolio";
import { useSelector } from "react-redux";

export default function PortefoliosPage({portefolioID = null, artisanID = null, name=null}) {
  
  const portefolios_collection  = useSelector(store => store.portefolios.collections)
  const artisans_collection     = useSelector(store => store.artisans.collections)

  const extract_galery_photos = (photos_collection) => photos_collection.filter(photo => !photo.banner && !photo.representant);
  
  const collection = portefolioID 
                                  ? sortByPhotoType(extract_galery_photos(portefolios_collection?.find(collection => collection?.id === portefolioID)?.photos || []))
                                  : sortByPhotoType(extract_galery_photos(artisans_collection?.find(collection => collection?.id === artisanID)?.photos || []))


  return (
    <PortefolioLayout portefolioName={name} collection={collection} />
  );
}