import ENDPOINT from "@Constants/Endpoint"
import { useCallback, useRef, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"
import ROUTES from "@Constants/Routes";
import callBackend from "./callBackend";



export default function useAuth(){

    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token"))
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh_token"))
    const refreshTimeout = useRef(null)
    const navigate = useNavigate()
    

    const verifyToken = () => {
        callBackend(ENDPOINT.ADMIN.verify, {method:"POST", data:{token:authToken}})
        .then(() => {
            navigate(ROUTES.ADMIN.DASHBOARD)
            scheduleRefresh(authToken)
        })
        .catch(() => {
            navigate(ROUTES.ADMIN.LOGIN)
            logout()
        })
    }

    const refreshAccessToken = useCallback(async() => {
        try{
            const tokens = await callBackend(ENDPOINT.ADMIN.refresh, {
                method:"POST",
                data:{refresh:localStorage.getItem("refresh_token")}
            })
            setTokens(tokens)
        }catch(error){
            console.error(error)
            logout()
        }
    }, [])

    const scheduleRefresh = useCallback((access) => {
        const { exp } = jwtDecode(access)         // exp en secondes UNIX
        const now = Date.now() / 1000              // en secondes UNIX
        const delay = (exp - now - 15) * 1000      // -60s de marge, en ms
        // const delay = 5000      // 5s test
    
        // Annule l’ancien timer si besoin
        if (refreshTimeout.current) {
          clearTimeout(refreshTimeout.current)
        }
    
        // Planifie la requête de refresh
        refreshTimeout.current = setTimeout(() => {
          refreshAccessToken()
        }, delay)
    }, [refreshAccessToken])

    const setTokens = useCallback(({ access, refresh }) => {
        setAuthToken(access)
        setRefreshToken(refresh)
        localStorage.setItem("access_token", access)
        localStorage.setItem("refresh_token", refresh)
        scheduleRefresh(access)
    }, [scheduleRefresh])

    
    const logout = useCallback(() => {
        setAuthToken(null);
        setRefreshToken(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (refreshTimeout.current) {
          clearTimeout(refreshTimeout.current);
        }
    }, []);

    

    

    return{
        setTokens,
        verifyToken
    }
}