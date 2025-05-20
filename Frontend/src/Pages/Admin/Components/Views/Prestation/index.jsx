import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import ENDPOINT from "@Constants/Endpoint";
import callBackend from "@Services/callBackend";
import sortByPhotoType from "@Services/sortByPhotoType";
import { toast } from "react-toastify";
import Loading from "@Components/Loading";

export default function Admin_View_Prestation({
    datas,
    setDatas,
    selectedContent,
    setPendingPhoto, 
    pendingPhotos, 
    handleClick_AddPhotos,
    setPrestations,
    setArtisans,
}){

    const [name, setName] = useState(datas.name)
    const [duration, setDuration] = useState(datas.duration)
    const [price, setPrice] = useState(datas.price)
    const [delivery, setDelivery] = useState(datas.delivery)
    const [description, setDescription] = useState(datas.description)
    
    const [sending, setSending] = useState(false)
    const [mode, setMode] = useState(null)
    const formRef = useRef(null)

    const [bannerPhotos, setBannerPhotos] = useState([])
    const [representantPhoto, setRepresentantPhoto] = useState(null)
    const [selectedBannerToSet, setSelectedBannerToSet] = useState(0)

    



    useEffect(() => {
        const bannerPhotos = datas.photos.filter(photo => photo.banner)
        const representantPhoto = datas.photos.find(photo => photo.representant)
        if(bannerPhotos){
            const finalsBanner = []
            for(let i = 0; i<3; i++){
                if(bannerPhotos[i]){
                    finalsBanner.push(bannerPhotos[i])
                }else{
                    finalsBanner.push({image:null})
                }

            }
            setBannerPhotos(finalsBanner)
        }else{
            setBannerPhotos(null)
        }
        if(representantPhoto){
            setRepresentantPhoto(representantPhoto)
        }else{
            setRepresentantPhoto(null)
        }
    }, [])

    const handleClick_deletePhoto = async(photoID, photoRepresentant, photoBanner) => {
        let answer = true
        if(photoRepresentant || photoBanner){
            let roleMessage
            if(photoRepresentant && !photoBanner){roleMessage = "représentante"}
            if(!photoRepresentant && photoBanner){roleMessage = "bannière"}
            if(photoRepresentant && photoBanner){roleMessage = "représentante et également bannière"}
            // const message = `Cette photo est une photo ${representantMessage} ${}`
            answer = window.confirm(`Cette photo est une photo ${roleMessage} de cette prestation. Vous êtes sur le point de la supprimer, le bon fonctionnement du site risque d'être impacter si elle n'est pas remplacer par la suite. Êtes vous sûr ?`)
        }
        if(answer){
            setSending(true)
            const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.DELETE(selectedContent.id, photoID), {method:"DELETE", secure:true})
            if(response.success){
                toast.success("Photo supprimé avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.filter(photo => photo.id !== photoID)
                setPrestations(current => current.map(presta => presta.id === selectedContent.id ? { ...presta, photos: copyDatas.photos }: presta ));
                if(photoRepresentant){
                    setRepresentantPhoto(null)
                    copyDatas.photos = copyDatas.photos.map(photo => {
                        if(photo.id === photoID){
                            photo.representant = false
                        }
                        return photo
                    })
                }
                if(photoBanner){
                    setBannerPhotos(prev =>
                        prev.map((photo, index) => {
                            // cas position (même 0)
                            if (photo.id === photoID) {
                                return { image:null };
                            }
                            // tous les autres restent inchangés
                            return photo;
                        })
                    );
                    copyDatas.photos = copyDatas.photos.map(photo => {
                        if(photo.id === photoID){
                            photo.banner = false
                        }
                        return photo
                    })
                }

                setDatas(copyDatas)
                setSending(false)
            }
        }
    }

    const handleClick_SavePhotos = async () => {
        setSending(true)
        const formData = new FormData()
        pendingPhotos.forEach(photo => formData.append("files", photo.file))
        const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.UPLOAD(selectedContent.id), {method:"POST", secure:true, data:formData})
        if(response){

            toast.success("Photo(s) ajouté avec succès")
            setSending(false)
            setPendingPhoto(null)
            const copyDatas = {...datas}
            response.datas.forEach(data => {
                copyDatas.photos.push(data)
            })
            copyDatas.photos = sortByPhotoType(copyDatas.photos)
            setDatas(copyDatas)
        }
    }

    const handleClick_ChangeRoleToRepresentant = async(photoID) => {
        if(photoID === representantPhoto?.id){
            return toast.error("Cette photo est déjà la photo représentante de cette prestation")
        }
        setSending(true)
        const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.CHANGE_REPRESENTANT(selectedContent.id, photoID), {method:"PATCH", secure:true})
        if(response.success){
            if(response.success){
                setRepresentantPhoto(datas.photos.find(photo => photo.id === photoID))
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.map(photo => {
                    if(photo.id === photoID){
                        photo.representant = true
                    }else{
                        photo.representant = false
                    }
                    return photo
                })
                setDatas(current => ({ ...current, photos: copyDatas.photos }));
                setSending(false)
                toast.success(response.message)
            }
        }
    }

    const handleClick_AddArtisan = async() => {
        const new_artisan_name = window.prompt("Le nom du nouvel artisan")
        if(new_artisan_name === ""){
            return toast.error("Le nom d'un artisan doit contenir au moins un caractère")
        }
        if(new_artisan_name){
            const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.ADD_ARTISAN, {method:"POST", data:{name:new_artisan_name}, secure:true})
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
            const response = await callBackend(ENDPOINT.ADMIN.ARTISANS.DELETE_ARTISAN(artisanID), {method:"DELETE", secure:true})
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
            const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.CHANGE_ARTISAN_NAME(artisanID), {method:"PATCH", data:{name:new_artisan_name}, secure:true})
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

    useEffect(() => {
        console.log("debug selectedBannerToSet", selectedBannerToSet)
    }, [selectedBannerToSet])
    useEffect(() => {
        console.log("debug bannerPhotos", bannerPhotos)
        if(mode === "banner"){
            let found = false
            bannerPhotos.forEach((banner, index) => {
                if(!banner.image && !found){
                    found = true
                    setSelectedBannerToSet(index)
                    return
                }
            })
        }
    }, [mode, bannerPhotos])

    const handleClick_ChangeRoleToBanner = async(photoID) => {
        setSending(true)
        const isReplace = bannerPhotos.find((photo, index) => (photo.image && index === selectedBannerToSet))
        const payload = {}
        if(bannerPhotos.find(banner => banner.id === photoID)){
            return toast.error("Cette photo est déjà défini en tant que bannière")
        }
        if(isReplace){
            payload.photo_to_replace_id = isReplace.id
        }else{
            payload.position = selectedBannerToSet
        }
        const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.CHANGE_BANNER(selectedContent.id, photoID), {method:"PATCH", secure:true, data:payload})
        if(response.success){
            setBannerPhotos(prev =>
                prev.map((photo, index) => {
                    // cas position (même 0)
                    if (response.position != null && index === response.position) {
                        return { id: photoID, image: response.image };
                    }
                    // cas replaceID
                    if (response.replaceID != null && photo.id === response.replaceID) {
                        return { id: photoID, image: response.image };
                    }
                    // tous les autres restent inchangés
                    return photo;
                })
            );
            const copyDatas = {...datas}
            copyDatas.photos = copyDatas.photos.map(photo => {
                if(photo.id === photoID){
                    photo.banner = true
                }
                if(response.replaceID){
                    if(photo.id === response.replaceID){
                        photo.banner = false
                    }
                }
                return photo
            })
            setDatas(copyDatas)
            toast.success(response.message)

        }
        setSending(false)

    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {
            name,
            duration,
            price,
            delivery,
            description,
        }
        const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.UPDATE_INFORMATIONS(selectedContent.id), {method:"PATCH", secure:true, data:data})
        if(response.success){
            toast.success("Prestation mise à jour avec succès")
            setPrestations(current => current.map(
                presta => presta.id === selectedContent.id 
                    ? { ...presta, name:data.name, price:data.price, duration:data.duration, delivery:data.delivery, description:data.description }
                    : presta 
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

    const isRepresentant = (photoRole) => (photoRole === "representant" ? "representant" : "")
    const roleClass = () =>  mode ? `${mode}Mode` : ""
    const roleAction = (photo) => {
        if(mode === "delete"){return ()  => handleClick_deletePhoto(photo.id, photo.representant, photo.banner)}
        if(mode === "representant"){return () => handleClick_ChangeRoleToRepresentant(photo.id)}
        if(mode === "banner"){return () => handleClick_ChangeRoleToBanner(photo.id)}
    }
    // const roleLabel = () => mode ? mode === "delete" ? "Supprimer" : "Définir comme bannière" : ""
    const roleLabel = () => {
         if(mode === "delete"){return "Supprimer"}
        if(mode === "representant"){return "Définir comme représentante"}
    }
    const actionActive = (actionMode) => actionMode === mode ? "active" : "" 
    const modeActive = () => mode ? "active" : "" 
    const isArtisanPrestation = () => datas?.name === "Artisan"
    const isSelectedToBeSet = (bannerIndex) => mode === "banner" ? selectedBannerToSet === bannerIndex ? "selected" : "unselected" : ""



    const formDisabledClass = useCallback(() => {

        const normalize = (str) => str.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim()

        const isSame = (
            String(datas.name)        === String(name)        &&
            String(datas.duration)    === String(duration)    &&
            Number(datas.price)       === Number(price)       &&
            Number(datas.delivery)   === Number(delivery)  &&
            normalize(datas.description) === normalize(description)
        )

        return isSame ? "disabled" : ""

        
    }, [datas, name, duration, price, delivery, description, selectedContent])

    const resetForm = () => {
        setName(datas.name)
        setDuration(datas.duration)
        setPrice(datas.price)
        setDelivery(datas.delivery)
        setDescription(datas.description)
    }

    
    



    return(
        <div id="admin-view-prestation">

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


            <div className="separator"/>


            <div className="role-photos">
                <div className="representant">
                    <span>Cette photo est la photo utiliser dans la page qui liste les différents portefolios (Photo représentante)</span>
                    <div>
                         {representantPhoto && (<picture className={`photo ${mode === "representant" ? "selected" : ""}`}><img  src={representantPhoto.image}/></picture>)}
                        {!representantPhoto && <div className={`noPhoto ${mode === "representant" ? "selected" : ""}`}><span>Pas de photo représentante</span></div>}
                    </div>
                </div>
                <div className="separator"></div>
                <div className="banner">
                    <span>Ces photos sont utilisé dans la page du portefolios en tant que bannière (Photos bannières)</span>
                    <picture>
                        {bannerPhotos.map((banner, index) => {
                            if(banner.image){
                                return <picture onClick={() => setSelectedBannerToSet(index)} key={index} className={`photo ${isSelectedToBeSet(index)}`}><img  src={banner.image} /></picture>
                            }else{
                                return <div onClick={() => setSelectedBannerToSet(index)} key={index} className={`noPhoto ${isSelectedToBeSet(index)}`}><span>Pas de photo bannière</span></div>
                            }
                        })}
                    </picture>
                </div>
            </div>

            <div className="separator"/>

            
            {!isArtisanPrestation() && (
                <>

                    <div className="actions">
                        <button onClick={handleClick_AddPhotos} className="action add">Ajouter des photos</button>
                        {pendingPhotos && (
                            <>
                                <button onClick={() => handleClick_SavePhotos()} className="action save">
                                    {sending && <Loading/>}
                                    {!sending && "Enregistrer"}
                                </button>
                                <button onClick={() => setPendingPhoto(null)} className="action cancel">Annuler</button>
                            </>
                        )}
                        {!pendingPhotos && <button onClick={() => setMode(current => current !== "delete" ? "delete" : null)} className={`action delete ${actionActive("delete")}`}>Supprimer des photos</button>}
                        {!pendingPhotos && <button onClick={() => setMode(current => current !== "representant" ? "representant" : null)} className={`action representant ${actionActive("representant")}`}>Définir une photo représentante</button>}
                        {!pendingPhotos && <button onClick={() => setMode(current => current !== "banner" ? "banner" : null)} className={`action banner ${actionActive("banner")}`}>Définir une photo bannière</button>}
                        
                    </div>
                    

                    <ul className="galery-container">

                        <div className="savedPhotos">
                            {datas.photos.map((photo, index) => (
                                <li key={index} className={`can_have_action ${modeActive()} ${photo.orientation} ${photo.representant ? "representant" : photo.banner ? "banner" : ""}`}>
                                    <img src={photo.image} />
                                    <button className={`overlay ${roleClass()}`} onClick={roleAction(photo)}>
                                        {roleLabel()}
                                    </button>
                                </li>
                            ))}
                        </div>
                        
                        <div className="pendingPhotos">
                            {pendingPhotos && pendingPhotos.map((photo, index) => (
                                <li key={index} className={`pending ${photo.orientation}`}>
                                    <img src={photo.url} alt="" />
                                </li>
                            ))}
                        </div>
                    </ul>
                </>
            )}


            {isArtisanPrestation() && (

                <>
                    <div className="actions">
                        <button onClick={handleClick_AddArtisan} className="action add">Ajouter un artisan</button>
                    </div>
                
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
                </>
                

            )}
        </div>
    )
}