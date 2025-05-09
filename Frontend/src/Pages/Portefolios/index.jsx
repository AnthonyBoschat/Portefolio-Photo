import { useEffect, useState } from "react";
import ROUTES from "@Constants/Routes";
import ENDPOINT from "@Constants/Endpoint";
import { useLocation, useParams } from "react-router-dom";
import sortByPhotoType from "@Services/sortByPhotoType";
import PortefolioLayout from "@Layout/Portefolio";
import callBackend from "@Services/callBackend";

export default function PortefoliosPage({portefolioID = null, artisanID = null, name=null}) {
  const location = useLocation()
  const currentRoute = location.pathname
  const [photos, setPhotos] = useState([]);
  const [portefolioType, setPortefolioType] = useState(null)

  useEffect(() => {

    const loadDatas = async() => {
      const endpoint = portefolioID ? ENDPOINT.PORTEFOLIOS.GET(portefolioID) : ENDPOINT.ARTISANS.GET(artisanID)
      const response = await callBackend(endpoint)
      const sortedPhotos = sortByPhotoType(response[0].photos)
      setPhotos(sortedPhotos)
    }

    loadDatas()

  }, [currentRoute])


  return (
    <PortefolioLayout photos={photos} portefolioType={name} />
    // <h1>Fetch des données</h1>
  );
}