import { useEffect, useRef, useState } from "react";
import "./old_style.scss";
import ENDPOINT from "@Constants/Endpoint";
import csrfFetch from "@Services/csrfCookie";

export default function AdminPage_Old(){

    const [type, setType] = useState("prestation")
    const [artisans, setArtisans] = useState([])
    const [prestations, setPrestations] = useState([])
    const [portefolios, setPortefolios] = useState([])

    const [artisan, setArtisan] = useState("")
    const [prestation, setPrestation] = useState("")
    const [portefolio, setPortefolio] = useState("")

    const inputRef = useRef()

    // 1️⃣ Charger les listes au montage
    useEffect(() => {
        Promise.all([
            fetch(ENDPOINT.ADMIN.ARTISANS.LIST).then(response => response.json()),
            fetch(ENDPOINT.ADMIN.PRESTATIONS.LIST).then(response => response.json()),
            fetch(ENDPOINT.ADMIN.PORTEFOLIOS.LIST).then(response => response.json())
        ]).then(([artisans, prestations, portefolios]) => {
            setArtisans(artisans)
            setPrestations(prestations)
            setPortefolios(portefolios)
        })
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault() 

        const formData = new FormData();
        for (let file of inputRef.current.files) {
            formData.append("files", file);
        }
        formData.append("artisan", artisan)
        formData.append("prestation", prestation)
        formData.append("portefolio", portefolio)

        const result = await csrfFetch(ENDPOINT.UPLOAD, {
            method:"POST",
            body:formData,
        })
        const response = await result.json()
        if(response.success){
            alert("Upload OK!");
            inputRef.current.value = "";
            // reset les selects si besoin
            setArtisan("");
            setPrestation("");
            setPortefolio("");
        }else {
            alert("Erreur: " + (response.error || "unknown"));
        }

    }


    return (
        <form onSubmit={handleSubmit} id="admin-main-container">
          {/* Choix du contexte */}
          <div>
            <label>Type de lien</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="artisan">Artisan</option>
              <option value="prestation">Prestation</option>
              <option value="portefolio">Portefolio</option>
            </select>
          </div>
    
          {/* Si on lie à un artisan */}
          {type === "artisan" && (
            <div>
              <label>Artisan</label>
              <select
                required
                value={artisan}
                onChange={e => setArtisan(e.target.value)}
              >
                <option value="">-- Choisir --</option>
                {artisans.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          )}
    
          {/* Si on lie à une prestation */}
          {type === "prestation" && (
            <>
              <div>
                <label>Prestation</label>
                <select
                  required
                  value={prestation}
                  onChange={e => setPrestation(e.target.value)}
                >
                  <option value="">-- Choisir --</option>
                  {prestations.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Artisan (facultatif)</label>
                <select
                  value={artisan}
                  onChange={e => setArtisan(e.target.value)}
                >
                  <option value="">-- Aucun --</option>
                  {artisans.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
    
          {/* Si on lie à un portefolio */}
          {type === "portefolio" && (
            <div>
              <label>Portefolio</label>
              <select
                required
                value={portefolio}
                onChange={e => setPortefolio(e.target.value)}
              >
                <option value="">-- Choisir --</option>
                {portefolios.map(pf => (
                  <option key={pf.id} value={pf.id}>
                    {pf.name}
                  </option>
                ))}
              </select>
            </div>
          )}
    
          <div>
            <label>Fichiers</label>
            <input required ref={inputRef} type="file" multiple />
          </div>
          <button type="submit">Enregistrer</button>
        </form>
      );
}