import { useRef, useState } from "react";
import "./style.scss";
import ENDPOINT from "@Constants/Endpoint";
import { toast } from "react-toastify";
import useAuth from "@Services/useAuth";
import { useNavigate } from "react-router-dom";
import ROUTES from "@Constants/Routes";
import callBackend from "@Services/callBackend";

export default function Admin_Login(){

    const {setTokens}           = useAuth()
    const navigate              = useNavigate()
    const emailInputRef         = useRef(null)
    const passwordInputRef      = useRef(null)
    const [passwordHidden, setPasswordHidden] = useState(true)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const creds = {
            username:emailInputRef.current.value.toLocaleLowerCase(),
            password:passwordInputRef.current.value
        }
        try{
            const response = await callBackend(ENDPOINT.ADMIN.token, {
                method: 'POST',
                data:creds,
            });
            setTokens(response)
            toast.dismiss()
            toast.success("Authentification réussi")
            navigate(ROUTES.ADMIN.DASHBOARD)
        }catch(error){
            toast.error("Informations incorrecte")
        }
    }

    return(
        <div id="admin_login_main_container">

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="">
                    <input value={"anthonyboschat.dev@hotmail.com"} onChange={() => true} autoComplete="username" ref={emailInputRef} placeholder="Adresse email" type="email" />
                </label>
                <label className="password" htmlFor="">
                    <input value={"sudosudo"} onChange={() => true} autoComplete="current-password" ref={passwordInputRef} placeholder="Mot de passe" type={passwordHidden ? "password" : "text"} />
                    <i onClick={() => setPasswordHidden(!passwordHidden)} className={`fa-solid ${passwordHidden ? "fa-eye-slash" : "fa-eye"} `}></i>
                </label>
                <input type="submit" value={"Se connecter"} />
            </form>

        </div>
    )
}