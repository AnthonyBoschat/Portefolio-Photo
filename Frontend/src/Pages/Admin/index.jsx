import { useRef } from "react";
import "./style.scss";
import ENDPOINT from "@Constants/Endpoint";

export default function AdminPage(){

    const inputRef = useRef()
    const selectRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault() 

        // Détermine le type de la photo
        const subject = selectRef.current.value
        let type
        if(selectRef.current.value.startsWith("po")){
            type="portefolio"
        }
        else if(selectRef.current.value.startsWith("pre")){
            type="prestation"
        }
        else if(selectRef.current.value.startsWith("ar")){
            type="artisan"
        }

        const formData = new FormData();
        for (let i = 0; i < inputRef.current.files.length; i++) {
            formData.append('files', inputRef.current.files[i]);
        }
        formData.append("type", type)
        formData.append("subject", subject)

        fetch(ENDPOINT.UPLOAD, {
            method:"POST",
            body:formData,
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                window.alert(`Photo uploader avec succès : 'type:${type}, subject:${subject}'`)
            }
        })
    }


    return(
        <form onSubmit={handleSubmit} id="admin-main-container">
            <div>
                <label htmlFor="">Quels élément à charger ?</label>
                <select ref={selectRef} name="" id="">
                    <option value="pre_portrait">prestation Portrait</option>
                    <option value="pre_artisan">prestation Artisan</option>
                    <option value="pre_boudoir">prestation Boudoir</option>
                </select>
            </div>
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