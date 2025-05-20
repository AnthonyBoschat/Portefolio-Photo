import { useEffect, useState } from "react";
import "./style.scss";
import callBackend from "@Services/callBackend";
import ENDPOINT from "@Constants/Endpoint";
import { toast } from "react-toastify";
import Loading from "@Components/Loading";
import sortByPhotoType from "@Services/sortByPhotoType";

export default function Admin_View_Portefolio({
    selectedContent, 
    datas, 
    setDatas, 
    setPendingPhoto, 
    pendingPhotos, 
    handleClick_AddPhotos,
    setPortefolios
}){

    const [sending, setSending] = useState(false)
    const [mode, setMode] = useState(null)
    const [representantPhoto, setRepresentantPhoto] = useState(null)


    useEffect(() => {
        if(datas){
            const representantPhoto = datas.photos.find(photo => photo.representant === true)
            if(representantPhoto){
                setRepresentantPhoto(representantPhoto)
            }else{
                setRepresentantPhoto(null)
            }
        }
    }, [])


    const handleClick_deletePhoto = async(photoID, photoRepresentant) => {
        let answer = true
        if(photoRepresentant){
            answer = window.confirm("Cette photo est une photo représentante de cette prestation. Vous êtes sur le point de la supprimer, le bon fonctionnement du site risque d'être impacter si elle n'est pas remplacer par la suite. Êtes vous sûr ?")
        }
        if(answer){
            setSending(true)
            const response = await callBackend(ENDPOINT.ADMIN.PORTEFOLIOS.DELETE(selectedContent.id, photoID), {method:"DELETE", secure:true})
            if(response.success){
                toast.success("Photo supprimé avec succès")
                const copyDatas = {...datas}
                copyDatas.photos = copyDatas.photos.filter(photo => photo.id !== photoID)
                setPortefolios(current => current.map(presta => presta.id === selectedContent.id ? { ...presta, photos: copyDatas.photos }: presta ));
                if(photoRepresentant){
                    setRepresentantPhoto(null)
                    copyDatas.photos = copyDatas.photos.map(photo => {
                        if(photo.id === photoID){
                            photo.representant = false
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

    const handleClick_ChangeRoleToRepresentant = async(photoID) => {
        if(photoID === representantPhoto?.id){
            return toast.error("Cette photo est déjà la photo représentante de cette prestation")
        }
        setSending(true)
        const response = await callBackend(ENDPOINT.ADMIN.PORTEFOLIOS.CHANGE_REPRESENTANT(selectedContent.id, photoID), {method:"PATCH", secure:true})
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
            toast.success(response.message)
            setSending(false)
            
        }
    }

    
    const roleClass = () =>  mode ? `${mode}Mode` : ""
    const roleAction = (photo) => {
        if(mode === "delete"){return ()  => handleClick_deletePhoto(photo.id, photo.representant)}
        if(mode === "representant"){return () => handleClick_ChangeRoleToRepresentant(photo.id)}
    }
    const roleLabel = () => {
         if(mode === "delete"){return "Supprimer"}
        if(mode === "representant"){return "Définir comme représentante"}
    }
    const actionActive = (actionMode) => actionMode === mode ? "active" : "" 
    const modeActive = () => mode ? "active" : "" 

    return(
        <div id="admin-view-portefolio">

            <div className="role-photos">
                <div className="representant">
                    <span>Cette photo est la photo utiliser dans la page qui liste les différents portefolios (Photo représentante)</span>
                    <div>
                        {representantPhoto && (<picture className={`photo ${mode === "representant" ? "selected" : ""}`}><img  src={representantPhoto.image}/></picture>)}
                        {!representantPhoto && <div className={`noPhoto ${mode === "representant" ? "selected" : ""}`}><span>Pas de photo représentante</span></div>}
                    </div>
                </div>
            </div>

            <div className="separator"/>

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

            
            <div className="separator"/>
            
            
            
            <ul className="galery-container">

                <div className="savedPhotos">
                    {datas.photos.map((photo, index) => (
                        <li key={index} className={`can_have_action ${modeActive()} ${photo.orientation} ${photo.representant ? "representant" : ""}`} >
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
        </div>
    )
}