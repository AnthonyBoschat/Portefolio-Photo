import sortByPhotoType from "@Services/sortByPhotoType";
import PortefolioLayout from "@Layout/Portefolio";
import { useSelector } from "react-redux";

export default function PortefoliosPage({portefolioID = null, artisanID = null, name=null}) {
  
  const portefolios_collection  = useSelector(store => store.portefolios.collections)
  const artisans_collection     = useSelector(store => store.artisans.collections)

  
  const collection = portefolioID 
                                  ? sortByPhotoType(portefolios_collection?.find(collection => collection?.id === portefolioID)?.photos)
                                  : sortByPhotoType(artisans_collection?.find(collection => collection?.id === artisanID)?.photos)

  return (
    <PortefolioLayout portefolioName={name} collection={collection} />
  );
}