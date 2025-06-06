import "./style.scss";
import { useEffect, useState } from "react";
import ENDPOINT from "@Constants/Endpoint";
import Loading from "@Components/Loading";
import sortByPhotoType from "@Services/sortByPhotoType";
import Admin_View from "../Views";

export default function Admin_Dashboard(){

    const [dataLoaded, setDataLoaded] = useState(false)

    const [selectedContent, setSelectedContent] = useState(null)
    const [selectedContentLabelID, setSelectedContentLabelID] = useState(null)

    const [portefolios, setPortefolios] = useState([])
    const [prestations, setPrestations] = useState([])
    const [artisans, setArtisans] = useState([])

    const [view, setView] = useState(null)
    const [datas, setDatas] = useState(null)


    // 1️⃣ Charger les listes au montage
    useEffect(() => {
        Promise.all([
            fetch(ENDPOINT.ARTISANS.LIST).then(response => response.json()),
            fetch(ENDPOINT.PRESTATIONS.LIST).then(response => response.json()),
            fetch(ENDPOINT.PORTEFOLIOS.LIST).then(response => response.json())
        ]).then(([artisans, prestations, portefolios]) => {
            setArtisans(artisans)
            setPrestations(prestations)
            setPortefolios(portefolios)
            setDataLoaded(true)
        })
    }, [])

    const handleClick = (contentCategory, content) => {
        setSelectedContent(content)
        setSelectedContentLabelID(`${contentCategory}${content.id}`)
        setView(contentCategory)
        if(contentCategory === "portefolio"){
            const portefolio = portefolios.find(portefolio => portefolio === content)
            portefolio.photos = sortByPhotoType(portefolio.photos)
            setDatas(portefolio)
            return
        }
        if(contentCategory === "prestation"){
            const prestation = prestations.find(prestation => prestation === content)
            prestation.photos = sortByPhotoType(prestation.photos)
            setDatas(prestation)
            return
        }
        if(contentCategory === "artisan"){
            const artisan = artisans.find(artisan => artisan === content)
            setDatas(artisan)
            return
        }

    }

    const isSelected = (category, content) => selectedContentLabelID === `${category}${content.id}` ? "selected" : ""

    


    return(
        <div id="admin-dashboard-container" >

            {dataLoaded ? (
                <div className="categories-container">
                    <div className="category">
                        <h2>Portefolios</h2>
                        <ul>
                            {portefolios.map(portefolio => (
                                <li className={isSelected("portefolio", portefolio)} key={portefolio.id} onClick={() => handleClick("portefolio", portefolio)}>{portefolio.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="category">
                        <h2>Prestations</h2>
                        <ul>
                            {prestations.map(prestation => (
                                <li className={isSelected("prestation", prestation)} key={prestation.id} onClick={() => handleClick("prestation", prestation)}>{prestation.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="category">
                        <h2>Artisans</h2>
                        <ul>
                            {artisans.map(artisan => (
                                <li className={isSelected("artisan", artisan)} key={artisan.id} onClick={() => handleClick("artisan", artisan)}>{artisan.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : <Loading style={{fontSize:"1.5rem"}}/>}






            <div className="content-container">

                {view && (
                    <Admin_View
                        key={selectedContent?.id}
                        datas={datas}
                        setDatas={setDatas}
                        selectedContent={selectedContent}
                        view={view}
                        setContent={view === "portefolio" ? setPortefolios : view === "prestation" ? setPrestations : setArtisans}
                        content={view === "portefolio" ? portefolios : view === "prestation" ? prestations : artisans}
                        setPrestations={setPrestations}
                        setArtisans={setArtisans}
                    />
                )}
            </div>


            
        </div>
    )
}