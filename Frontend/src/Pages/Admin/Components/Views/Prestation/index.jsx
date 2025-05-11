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

    console.log(datas)
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


    useEffect(() => {
        const bannerPhotos = datas.photos.filter(photo => photo.role === "banner")
        const representantPhoto = datas.photos.find(photo => photo.role === "representant")
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
    }, [datas])

    const handleClick_deletePhoto = async(photoID, photoRole) => {
        let answer = true
        if(isRepresentant(photoRole)){
            answer = window.confirm("Vous êtes sur le point de supprimer la photo bannière de cette prestation, elle n'apparaitra plus dans la liste des prestations. Êtes vous sûr ?")
        }
        if(answer){
            setSending(true)
            const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.DELETE(selectedContent.id, photoID), {method:"DELETE", secure:true})
            if(response.success){
                toast.success("Photo supprimé avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.filter(photo => photo.id !== photoID)
                setDatas(copyDatas)
                setPrestations(current => current.map(presta => presta.id === selectedContent.id ? { ...presta, photos: copyDatas.photos }: presta ));
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

    const handleClick_ChangeRole = async(photoID) => {
        setSending(true)
        const response = await callBackend(ENDPOINT.ADMIN.PRESTATIONS.CHANGE_REPRESENTANT(selectedContent.id, photoID), {method:"PATCH", secure:true})
        if(response.success){
            if(response.success){
                toast.success("Nouvelle photo représentante défini avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.map(photo => {
                    if(photo.id === photoID){
                        photo.role = "representant"
                    }else{
                        photo.role = null
                    }
                    return photo
                })
                setDatas(current => ({ ...current, photos: copyDatas.photos }));
                setSending(false)
            }
        }
    }

    const handleClick_AddArtisan = async() => {
        const new_artisan_name = window.prompt("Le nom du nouvel artisan")
        if(new_artisan_name === ""){
            return toast.error("Le nom d'un artisan doit contenir au moins un caractère")
        }
        if(new_artisan_name){
            const response = await callBackend(ENDPOINT.ADMIN.ARTISANS.ADD, {method:"POST", data:{name:new_artisan_name}, secure:true})
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
            const response = await callBackend(ENDPOINT.ADMIN.ARTISANS.DELETE(artisanID), {method:"DELETE", secure:true})
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
            const response = await callBackend(ENDPOINT.ADMIN.ARTISANS.CHANGE_NAME(artisanID), {method:"PATCH", data:{name:new_artisan_name}, secure:true})
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
        if(mode === "delete"){return ()  => handleClick_deletePhoto(photo.id, photo.role)}
        if(mode === "representant"){return () => handleClick_ChangeRole(photo.id)}
    }
    // const roleLabel = () => mode ? mode === "delete" ? "Supprimer" : "Définir comme bannière" : ""
    const roleLabel = () => {
         if(mode === "delete"){return "Supprimer"}
        if(mode === "representant"){return "Définir comme représentante"}
    }
    const actionActive = (actionMode) => actionMode === mode ? "active" : "" 
    const modeActive = () => mode ? "active" : "" 
    const isArtisanPrestation = () => datas?.name === "Artisan"


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
                    <picture>
                        {representantPhoto && (<img className="photo" src={representantPhoto.image}/>)}
                        {!representantPhoto && <div className="noPhoto"><span>Pas de photo représentante</span></div>}
                    </picture>
                </div>
                <div className="separator"></div>
                <div className="banner">
                    <span>Ces photos sont utilisé dans la page du portefolios en tant que bannière (Photos bannières)</span>
                    <picture>
                        {bannerPhotos.map((banner, index) => {
                            if(banner.image){
                                return <img key={index} src={banner.image} />
                            }else{
                                return <div key={index} className="noPhoto"><span>Pas de photo bannière</span></div>
                            }
                        })}
                        {/* {representantPhoto && (<img className="photo" src={representantPhoto.image}/>)}
                        {!representantPhoto && <div className="noPhoto"><span>Pas de photo bannière</span></div>} */}
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
                        
                    </div>
                    

                    <ul className="galery-container">

                        <div className="savedPhotos">
                            {datas.photos.map((photo, index) => (
                                <li key={index} className={`can_have_action ${modeActive()} ${photo.orientation}`}>
                                    <img src={photo.image} />
                                    <button className={roleClass()} onClick={roleAction(photo)}>
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