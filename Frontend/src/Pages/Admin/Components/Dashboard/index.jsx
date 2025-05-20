import AdminPage_Old from "@Pages/Admin/Old/old_index";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import ENDPOINT from "@Constants/Endpoint";
import Loading from "@Components/Loading";
import callBackend from "@Services/callBackend";
import { toast } from "react-toastify";
import Admin_View_Portefolio from "../Views/Portefolio";
import sortByPhotoType from "@Services/sortByPhotoType";
import Admin_View_Prestation from "../Views/Prestation";
import Admin_View_Artisan from "../Views/Artisan";
import Admin_View from "../Views";

export default function Admin_Dashboard(){

    const [dataLoaded, setDataLoaded] = useState(false)

    const [selectedContent, setSelectedContent] = useState(null)
    const [selectedContentLabelID, setSelectedContentLabelID] = useState(null)

    const [portefolios, setPortefolios] = useState([])
    const [prestations, setPrestations] = useState([])
    const [artisans, setArtisans] = useState([])

    const [pendingPhotos, setPendingPhoto] = useState(null)

    const [view, setView] = useState(null)
    const [datas, setDatas] = useState(null)

    const fileInputRef = useRef(null);


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
        setPendingPhoto(null)
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

    const handleClick_AddPhotos = () => {
        fileInputRef.current.click();
    }

    const handleFiles = async(e) => {
        const files = Array.from(e.target.files);
        if(!files.length){
            return
        }
        const photosPromises = files.map(async (file) => {
            const bitmap = await createImageBitmap(file);
            const orientation = bitmap.width > bitmap.height ? 'paysage' : 'portrait';
            const url = URL.createObjectURL(file);
            return { file, url, orientation };
        });
        const photos = await Promise.all(photosPromises);
        setPendingPhoto(current =>
            current ? sortByPhotoType([...current, ...photos]) : sortByPhotoType(photos)
        );
    };

    const isSelected = (category, content) => selectedContentLabelID === `${category}${content.id}` ? "selected" : ""

    


    return(
        <div id="admin-dashboard-container" >

            <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: 'none' }}
                onChange={handleFiles}
            />


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
                {/* {view === "portefolio" && (
                    <Admin_View_Portefolio
                        key={selectedContent.id}
                        selectedContent={selectedContent}
                        datas={datas}
                        setDatas={setDatas}
                        setPendingPhoto={setPendingPhoto}
                        pendingPhotos={pendingPhotos}
                        handleClick_AddPhotos={handleClick_AddPhotos}
                        setPortefolios={setPortefolios}

                    />
                )}
                {view === "prestation" && (
                    <Admin_View_Prestation
                        key={selectedContent.id}
                        selectedContent={selectedContent}
                        datas={datas}
                        setDatas={setDatas}
                        setPendingPhoto={setPendingPhoto}
                        pendingPhotos={pendingPhotos}
                        handleClick_AddPhotos={handleClick_AddPhotos}
                        setPrestations={setPrestations}
                        setArtisans={setArtisans}
                    />
                )}
                {view === "artisan" && (
                    <Admin_View_Artisan
                        key={selectedContent.id}
                        selectedContent={selectedContent}
                        datas={datas}
                        setDatas={setDatas}
                        setPendingPhoto={setPendingPhoto}
                        pendingPhotos={pendingPhotos}
                        handleClick_AddPhotos={handleClick_AddPhotos}
                        setArtisans={setArtisans}
                    />
                )} */}
            </div>


            
        </div>
    )
}