import { useEffect, useRef, useState } from "react";
import "./style.scss";
import ENDPOINT from "@Constants/Endpoint";
import csrfFetch from "@Services/csrfCookie";

export default function AdminPage(){

    const [type, setType] = useState("prestation")
    const [subject, setSubject] = useState(null)
    const [artisan, setArtisan] = useState(null)

    const inputRef = useRef()

   useEffect(() => {
    if(subject !== "pre_artisan"){
        setArtisan(null)
    }
   }, [subject])


    const handleSubmit = (e) => {
        e.preventDefault() 

        const formData = new FormData();
        for (let i = 0; i < inputRef.current.files.length; i++) {
            formData.append('files', inputRef.current.files[i]);
        }
        formData.append("type", type)
        formData.append("subject", subject)
        formData.append("artisan", artisan)

        csrfFetch(ENDPOINT.UPLOAD, {
            method:"POST",
            body:formData,
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                window.alert(`Photo enregistrer avec succès : 'type:${type}, subject:${subject}, ${artisan ? `artisan:${artisan}` : ""}'`)
                inputRef.current.value = ""
            }
        })
    }


    return(
        <form onSubmit={handleSubmit} id="admin-main-container">
            <h1>Type : {type}</h1>
            <h1>Sujet : {subject}</h1>
            <div>
                <label htmlFor="">Type</label>
                <select required value={type} onChange={(e) => setType(e.currentTarget.value)}>
                    <option value="prestation">Prestation</option>
                    <option value="portefolio">Portefolio</option>
                </select>
            </div>


            {type === "portefolio" && (
                <div>
                    <label htmlFor="">De quel Portefolio il s'agit ?</label>
                    <select required value={subject} onChange={(e) => setSubject(e.currentTarget.value)}>
                        <option value="">--------</option>
                        <option value="po_collaborationArtistique">Collaboration Artistique</option>
                        <option value="po_fantastique">Fantastique</option>
                        <option value="po_lumiereNaturelle">Lumière Naturelle</option>
                        <option value="po_nuLingerie">Nu - Lingerie</option>
                        <option value="po_studio">Studio</option>
                        <option value="po_retoucheCreatives">Retouches Créative</option>
                    </select>
                </div>
            )}

            {type === "prestation" && (
                <div>
                    <label htmlFor="">De quel Prestation il s'agit ?</label>
                    <select required value={subject} onChange={(e) => setSubject(e.currentTarget.value)}>
                        <option value="">--------</option>
                        <option value="pre_portrait">Portrait</option>
                        <option value="pre_artisan">Artisan</option>
                        <option value="pre_boudoir">Boudoir</option>
                    </select>
                </div>
            )}

            {subject === "pre_artisan" && (
                <div>
                    <label htmlFor="">De quel Artisan il s'agit ?</label>
                    <select required value={artisan} onChange={(e) => setArtisan(e.currentTarget.value)}>
                        <option value="">--------</option>
                        <option value={1}>Atelier by Lou</option>
                    </select>
                </div>
            )}


            <div>
                <label htmlFor="">Fichiers</label>
                <input required ref={inputRef} type="file" multiple/>
            </div>
            <div>
                <input type="submit" value="Enregistrer"/>
            </div>

        </form>
            
        
    )
}