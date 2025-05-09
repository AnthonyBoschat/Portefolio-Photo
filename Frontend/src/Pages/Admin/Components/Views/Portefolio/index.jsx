import { useEffect, useState } from "react";
import "./style.scss";
import callBackend from "@Services/callBackend";
import ENDPOINT from "@Constants/Endpoint";
import { toast } from "react-toastify";
import Loading from "@Components/Loading";

export default function Admin_View_Portefolio({
    selectedContent, 
    datas, 
    setDatas, 
    setPendingPhoto, 
    pendingPhotos, 
    handleClick_AddPhotos,
}){

    const [sending, setSending] = useState(false)
    const [mode, setMode] = useState(null)
    const [bannerPhoto, setBannerPhoto] = useState(null)

    useEffect(() => {
        const banner = datas.photos.find(photo => photo.role === "banner")
        if(banner){
            setBannerPhoto(banner)
        }else{
            setBannerPhoto(null)
        }
    }, [bannerPhoto, datas])

    const handleClick_deletePhoto = async(photoID, photoRole) => {
        let answer = true
        if(isBanner(photoRole)){
            answer = window.confirm("Vous êtes sur le point de supprimer la photo bannière de ce portefolio, elle n'apparaitra plus dans la liste des portefolios. Êtes vous sûr ?")
        }
        if(answer){
            setSending(true)
            const response = await callBackend(ENDPOINT.ADMIN.PORTEFOLIOS.DELETE(selectedContent.id, photoID), {method:"DELETE", secure:true})
            if(response.success){
                toast.success("Photo supprimé avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.filter(photo => photo.id !== photoID)
                setDatas(copyDatas)
                setSending(false)
            }
        }
    }

    const handleClick_SavePhotos = async () => {
        setSending(true)
        const formData = new FormData()
        pendingPhotos.forEach(photo => formData.append("files", photo.file))
        const response = await callBackend(ENDPOINT.ADMIN.PORTEFOLIOS.UPLOAD(selectedContent.id), {method:"POST", secure:true, data:formData})
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
        const response = await callBackend(ENDPOINT.ADMIN.PORTEFOLIOS.CHANGE_BANNER(selectedContent.id, photoID), {method:"PATCH", secure:true})
        if(response.success){
            if(response.success){
                toast.success("Nouvelle bannière défini avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.map(photo => {
                    if(photo.id === photoID){
                        photo.role = "banner"
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

    const isBanner = (photoRole) => (photoRole === "banner" ? "banner" : "")


    const roleClass = () =>  mode ? `${mode}Mode` : ""
    const roleAction = (photo) => mode === "delete" ? () => handleClick_deletePhoto(photo.id, photo.role) : () => handleClick_ChangeRole(photo.id)
    const roleLabel = () => mode ? mode === "delete" ? "Supprimer" : "Définir comme bannière" : ""
    const actionActive = (actionMode) => actionMode === mode ? "active" : "" 
    const modeActive = () => mode ? "active" : "" 

    return(
        <div id="admin-view-portefolio">
            <div className="actions">
                <button onClick={handleClick_AddPhotos} className="action">Ajouter des photos</button>
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
                {!pendingPhotos && <button onClick={() => setMode(current => current !== "banner" ? "banner" : null)} className={`action banner ${actionActive("banner")}`}>Définir une nouvelle bannière</button>}
                
            </div>

                {bannerPhoto && <img className="photoBanner" src={bannerPhoto.image}/>}
                {!bannerPhoto && <div className="noPhotoBanner"><span>Pas de photo bannière</span></div>}
            

            <ul className="portefolio-galery-container">

                <div className="savedPhotos">
                    {datas.photos.map(photo => (
                        <li className={`can_have_action ${modeActive()} ${photo.orientation}`} key={photo.id}>
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
        </div>
    )
}