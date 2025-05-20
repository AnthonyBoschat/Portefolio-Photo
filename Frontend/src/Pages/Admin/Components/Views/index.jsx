import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import Galery from "@Components/Galery";
import callBackend from "@Services/callBackend";
import ENDPOINT from "@Constants/Endpoint";
import { toast } from "react-toastify";
import sortByPhotoType from "@Services/sortByPhotoType";
import usePhoto from "@Services/usePhoto";


export default function Admin_View({
    datas,
    setDatas,
    view,
    selectedContent,
    content,
    setContent,
    setArtisans,
    setPrestations
}){

    const {zoomPhoto}                   = usePhoto()
    const filesInputRef                 = useRef()
    const fileInputRef_representant     = useRef()
    const fileInputRef_banner           = useRef()
    const formRef                       = useRef()

    const [sending, setSending]                                 = useState(false)
    const [deleteMode, setDeleteMode]                           = useState(false)
    const [selectedBannerPosition, setSelectedBannerPosition]   = useState(0)
    const [selectedBannerID, setSelectedBannerID]               = useState(null)
    const [name, setName]                                       = useState(datas?.name)
    const [duration, setDuration]                               = useState(datas?.duration)
    const [price, setPrice]                                     = useState(datas?.price)
    const [delivery, setDelivery]                               = useState(datas?.delivery)
    const [description, setDescription]                         = useState(datas?.description)

    const contentID                                 = useMemo(() => selectedContent?.id, [selectedContent])
    const isPortefolio                              = useMemo(() => view === "portefolio", [view, selectedContent, view])
    const isPrestation                              = useMemo(() => view === "prestation", [view, selectedContent, view])
    const isArtisan                                 = useMemo(() => view === "artisan", [view, selectedContent, view])
    const isArtisanPrestation                       = useMemo(() => datas?.name === "Artisan", [datas, selectedContent, view])
    const haveGaleryPhotos                          = useMemo(() => datas?.photos?.length !== 0, [datas, selectedContent, view])
    const CURRENT_ENDPOINT                          = useMemo(() => isPortefolio ? ENDPOINT.ADMIN.PORTEFOLIOS : isPrestation ? ENDPOINT.ADMIN.PRESTATIONS : ENDPOINT.ADMIN.ARTISANS,[isPortefolio, isPrestation, isArtisan, selectedContent, view])
    const representantPhoto                         = useMemo(() => datas?.photos.find(photo => photo.representant === true), [datas, selectedContent, view])
    const bannerPhotos                              = useMemo(() => {
                                                        const banner_photos = datas?.photos.filter(photo => photo.banner) ?? [];

                                                        // Initialise un tableau de 3 emplacements vides
                                                        const finals = Array.from({ length: 3 }, () => ({ image: null }));

                                                        // Pour chaque photo, place-la à l'indice position-1 si c'est valide
                                                        banner_photos.forEach(photo => {
                                                            const index = Number(photo.position) - 1;
                                                            if (index >= 0 && index < finals.length) {
                                                                finals[index] = photo;
                                                            }
                                                        });

                                                        return finals;
                                                    }, [datas, selectedContent, view])
    const galeryPhotos                              = useMemo(() => {
                                                        const galery_photos = datas?.photos?.filter(photo => photo.representant === false && photo.banner === false)
                                                        if(galery_photos){return sortByPhotoType(galery_photos)}
                                                        return []
                                                    }, [datas, selectedContent, view])

    

    const handleClick_AddPhotos = async(event) => {
        const files = Array.from(event.target.files);
        if(!files.length){ return }
        setSending(true)
        const formData = new FormData()
        files.forEach(file => formData.append("files", file))
        const response = await callBackend(CURRENT_ENDPOINT["UPLOAD"](selectedContent.id), {method:"POST", secure:true, data:formData})
        if(response){
            setSending(false)
            const copyDatas = {...datas}
            response.datas.forEach(data => {
                copyDatas.photos.push(data)
            })
            copyDatas.photos = sortByPhotoType(copyDatas.photos)
            const copyContent = [...content]
            copyContent.map(element => {
                if(element.id === contentID){
                    element.photos = copyDatas.photos
                }
                return element
            })
            setContent(copyContent)
            setDatas(copyDatas)
            toast.success("Photo(s) ajouté avec succès")
        }
    };
    const handleClick_AddRepresentantPhoto = async(event) => {
        setSending(true)
        const files = Array.from(event.target.files);
        if(!files.length){ return }
        const formData = new FormData()
        formData.append("files", files[0])
        const response = await callBackend(CURRENT_ENDPOINT["UPLOAD_REPRESENTANT"](contentID), {method:"POST", secure:true, data:formData})
        if(response.success){
            setSending(false)
            const copyDatas = {...datas}
            copyDatas.photos = copyDatas.photos.filter(photo => photo.representant === false)
            copyDatas.photos.push(response.photo)
            setContent(current => current.map(element => element.id === contentID ? {...element, photos: copyDatas.photos} : element))
            setDatas(copyDatas)
            toast.success(response.message)
        }
    };
    const handleClick_AddBannerPhoto = async(event) => {
        setSending(true)
        const files = Array.from(event.target.files);
        if(!files.length){ return }
        const formData = new FormData()
        formData.append("files", files[0])
        if (selectedBannerID) {
            formData.append("photo_to_replace_id", selectedBannerID);
        } else {
            formData.append("position", selectedBannerPosition + 1);
        }
        const response = await callBackend(CURRENT_ENDPOINT["UPLOAD_BANNER"](contentID), {method:"POST", secure:true, data:formData})
        if(response.success){
            setSending(false)
            const copyDatas = {...datas}
            if (selectedBannerID) {
                copyDatas.photos = copyDatas.photos.map(photo =>
                    photo.id === selectedBannerID
                    ? response.photo     // on remplace l’ancien par le nouveau
                    : photo
                );
            } 
            else {
                copyDatas.photos = [...copyDatas.photos, response.photo];
            }
            setDatas(copyDatas)
            setContent(current => current.map(element => element.id === contentID ? {...element, photos: copyDatas.photos} : element))
            toast.success(response.message)
        }
    };


    const handleClick_AddArtisan = async() => {
        const new_artisan_name = window.prompt("Le nom du nouvel artisan")
        if(new_artisan_name === ""){
            return toast.error("Le nom d'un artisan doit contenir au moins un caractère")
        }
        if(new_artisan_name){
            const response = await callBackend(CURRENT_ENDPOINT["ADD_ARTISAN"], {method:"POST", data:{name:new_artisan_name}, secure:true})
            if(response.success){
                const copyArtisans = [...datas.artisans]
                copyArtisans.push(response.new_artisan)
                setDatas(current => ({...current, artisans: copyArtisans}))
                setPrestations(current => current.map(prestation => prestation.name === "Artisan" ? {...prestation, artisans:copyArtisans} : prestation))
                setArtisans(current => [...current, {
                    id:response.new_artisan.id,
                    name:response.new_artisan.name,
                    photos:[]
                }])
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
        }
    }


    const handleClick_DeleteArtisan = async(artisanID) => {
        const confirm = window.confirm("Vous êtes sur le point de supprimer cet artisan, toutes les photos qui lui sont associés seronts supprimés également.\n\n Êtes vous sûr ?")
        if(confirm){
            const response = await callBackend(CURRENT_ENDPOINT["DELETE_ARTISAN"](artisanID), {method:"DELETE", secure:true})
            if(response.success){
                setDatas(current => ({...current, artisans:current.artisans.filter(artisan => artisan.id !== response.deleted_id)}))
                setPrestations(current => current.map(prestation => prestation.name === "Artisan" ? {...prestation, artisans: prestation.artisans.filter(artisan => artisan.id !== response.deleted_id)} : prestation))
                setArtisans(current => current.filter(artisan => artisan.id !== response.deleted_id))
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
        }
    }

    const handleClick_UpdateArtisan = async(artisanID, artisanName) => {
        const new_artisan_name = window.prompt(`Nouveau nom de l'artisan ? ( ${artisanName} )`)
        if(new_artisan_name === ""){
            return toast.error("Le nouveau nom de l'artisan doit contenir au moins un caractère")
        }
        if(new_artisan_name === artisanName){
            return toast.error("Le nom de l'artisan doit être différent.")
        }
        if(new_artisan_name){
            const response = await callBackend(CURRENT_ENDPOINT["CHANGE_ARTISAN_NAME"](artisanID), {method:"PATCH", data:{name:new_artisan_name}, secure:true})
            if(response.success){
                setDatas(current => ({...current, artisans:current.artisans.map(artisan => artisan.id === response.artisan_id ? {...artisan, name:response.artisan_new_name} : artisan )}))
                setPrestations(current => current.map(prestation => prestation.name === "Artisan" ? {...prestation, artisans: prestation.artisans.map(artisan => artisan.id === response.artisan_id ? {...artisan, name:response.artisan_new_name} : artisan)} : prestation))
                setArtisans(current => current.map(artisan => artisan.id === response.artisan_id ? {...artisan, name:response.artisan_new_name} : artisan))
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
        }
    }


    const handleClick_DeletePhoto = async(photoID) => {
        
        setSending(true)
        const response = await callBackend(CURRENT_ENDPOINT["DELETE"](contentID, photoID), {method:"DELETE", secure:true})
        if(response.success){
            const copyDatas = {...datas}
            copyDatas.photos = copyDatas.photos.filter(photo => photo.id !== photoID)
            setContent(current => current.map(element => element.id === contentID ? { ...element, photos: copyDatas.photos }: element ));
            toast.success(response.message)
            setDatas(copyDatas)
            setSending(false)
        }
    };



    const formDisabledClass = useCallback(() => {
    
            const normalize = (str) => str.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim()
    
            const isSame = (
                String(datas.name)              === String(name)        &&
                String(datas.duration)          === String(duration)    &&
                Number(datas.price)             === Number(price)       &&
                Number(datas.delivery)          === Number(delivery)    &&
                normalize(datas.description)    === normalize(description)
            )
    
            return isSame ? "disabled" : ""
    
            
    }, [datas, name, duration, price, delivery, description, selectedContent])

    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {
            name,
            duration,
            price,
            delivery,
            description,
        }
        const response = await callBackend(CURRENT_ENDPOINT["UPDATE_INFORMATIONS"](selectedContent.id), {method:"PATCH", secure:true, data:data})
        if(response.success){
            toast.success("Prestation mise à jour avec succès")
            setContent(current => current.map(
                element => element.id === contentID
                    ? { ...element, name:data.name, price:data.price, duration:data.duration, delivery:data.delivery, description:data.description }
                    : element 
            ));
            const copyDatas = {...datas}
            copyDatas.name = data.name
            copyDatas.price = data.price
            copyDatas.duration = data.duration
            copyDatas.delivery = data.delivery
            copyDatas.description = data.description
            setDatas(copyDatas)
        }
    }

    const resetForm = () => {
        setName(datas.name)
        setDuration(datas.duration)
        setPrice(datas.price)
        setDelivery(datas.delivery)
        setDescription(datas.description)
    }


    return(
        <div id="admin_view_layout">

            <input
                type="file"
                ref={filesInputRef}
                multiple
                style={{ display: 'none' }}
                onChange={handleClick_AddPhotos}
            />
            <input
                type="file"
                ref={fileInputRef_representant}
                style={{ display: 'none' }}
                onChange={handleClick_AddRepresentantPhoto}
            />
            <input
                type="file"
                ref={fileInputRef_banner}
                style={{ display: 'none' }}
                onChange={handleClick_AddBannerPhoto}
            />
            
            <div className={`actions_layout ${deleteMode ? "deleteMode" : ""}`}>
                <ul>
                    {!isArtisanPrestation && (
                        <>
                            <li>
                                <button className="action" onClick={() => filesInputRef.current.click()}>Ajouter des photos</button>
                            </li>
                            <li>
                                <button className={`action delete ${deleteMode ? "deleteMode" : ""}`} onClick={() => setDeleteMode(current => !current)}>Supprimer des photos</button>
                            </li>
                        </>
                    )}
                    {isArtisanPrestation && (
                        <li>
                            <button onClick={() => handleClick_AddArtisan()} className="action">Ajouter un artisan</button>
                        </li>
                    )}
                </ul>
            </div>


            {isPrestation && (
                <div className="form_layout">
                    <form onSubmit={handleSubmit} ref={formRef} action="">
                        <div className="nameDurationPriceDelivery">
                            <div>
                                <label htmlFor="name">Nom</label>
                                <input value={name} onChange={(e) => setName(e.currentTarget.value)} id="name" name="name" type="text" />
                            </div>
                            <div>
                                <label htmlFor="duration">Durée</label>
                                <input value={duration} onChange={(e) => setDuration(e.currentTarget.value)} id="duration" name="duration" type="text" />
                            </div>
                            <div>
                                <label htmlFor="price">Prix</label>
                                <input value={price} onChange={(e) => setPrice(e.currentTarget.value)} name="price" id="price" type="number" />
                            </div>
                            <div>
                                <label htmlFor="delivery">Photos fournis</label>
                                <input value={delivery} onChange={(e) => setDelivery(e.currentTarget.value)} name="delivery" id="delivery" type="number" />
                            </div>
                            
                        </div>
                        
                        
                        <div className="description">
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} name="description" id="description"/>
                            </div>
                        </div>

                        <div className="actions">
                            <input className={formDisabledClass()} type="submit" value={"Enregistrer"} />
                            <input onClick={resetForm} className={formDisabledClass()} type="button" value={"Réinitialiser"} />
                        </div>
                    </form>
                </div>
            )}


            <div className="role_layout">

                <div className="representant section">
                    <span className="detail">Photo représentante {isPortefolio ? "du portefolio" : isPrestation ? "de la prestation" : "de l'artisan"}</span>
                    <div className={`container`}>
                        {representantPhoto && <div className="full" onClick={() => fileInputRef_representant.current.click()}><img src={representantPhoto.image} /></div>}
                        {!representantPhoto && <div className="empty" onClick={() => fileInputRef_representant.current.click()}><i className="fa-solid fa-download"></i></div>}
                    </div>
                </div>

                {isPrestation && (
                    <div className="banner section">
                        <span className="detail">Photos bannière {isPortefolio ? "du portefolio" : isPrestation ? "de la prestation" : "de l'artisan"}</span>
                        <div className="container">
                            {bannerPhotos.map((photo, index) => {
                                if(photo.image){
                                    return <div onClick={() => {
                                        setSelectedBannerPosition(index)
                                        setSelectedBannerID(photo.id)
                                        fileInputRef_banner.current.click()
                                    }} key={index} className="full"><img src={photo.image} /></div>
                                }else{
                                    return <div onClick={() => {
                                        setSelectedBannerPosition(index)
                                        setSelectedBannerID(photo.id)
                                        fileInputRef_banner.current.click()
                                    }} key={index} className="empty"><i className="fa-solid fa-download"></i></div>
                                }
                            })}
                        </div>
                    </div>
                )}

            </div>


            <div className="content_layout">
                {isArtisanPrestation && (<span className="detail">Liste des artisans</span>)}
                {!isArtisanPrestation && (<span className="detail">Photos galerie {isPortefolio ? "du portefolio" : isPrestation ? "de la prestation" : "de l'artisan"}</span>)}
                
                {(!isArtisanPrestation && galeryPhotos.length !== 0) && (
                    <Galery 
                        id={"container"}
                        elements={galeryPhotos} 
                        hoverEffect
                        render={(photo, index) => ( 
                            <picture onClick={deleteMode ? () => handleClick_DeletePhoto(photo.id) : () => zoomPhoto(galeryPhotos, index)}>
                                <img  src={photo.image} />
                            </picture>
                        )}
                    />
                )}
                {(!isArtisanPrestation && galeryPhotos.length === 0) && (
                    <div className="noPhoto">
                        <i className="fa-solid fa-image"></i>
                        <span> Aucune photo </span>
                    </div>
                )}

                {isArtisanPrestation && (
                    <ul className="artisan-container">
                        {datas.artisans.map((artisan, index) => (
                            <li key={index}>
                                <span className="number">{index + 1}.</span>
                                <span>{artisan.name}</span>
                                <button onClick={() => handleClick_DeleteArtisan(artisan.id)} className="action delete">Supprimer</button>
                                <button onClick={() => handleClick_UpdateArtisan(artisan.id, artisan.name)} className="action update">Modifier le nom</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div>
    )
}