import "./style.scss";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@Services/useAuth";

export default function AdminPage(){

    const {verifyToken}         = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        verifyToken()
        setLoading(false)
    }, [])

    return(
        <div id="admin_main_container">
            <header>
                <h1>Outil d'administration</h1>
            </header>
            {!loading && <Outlet/>}
        </div>
    )
}