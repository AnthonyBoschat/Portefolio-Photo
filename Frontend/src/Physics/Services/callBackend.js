import ENDPOINT from "@Constants/Endpoint"
import ROUTES from "@Constants/Routes"


export default async function callBackend(endpoint, {method="GET", data=null, params=null, secure=false} = {}){

    const headers = {}
    let refresh_token = false
    let access_token = false

    let url = endpoint
    if(params){
        const query = new URLSearchParams(params).toString()
        url+= `?${query}`
    }

    if(secure){
        access_token = localStorage.getItem("access_token")
        refresh_token = localStorage.getItem("refresh_token")
        if(access_token){
            headers["Authorization"] = `Bearer ${access_token}`
        }
    }

    if(data && !(data instanceof FormData)){
        headers["Content-Type"] = "application/json"
    }

    const body = data 
                    ? data instanceof FormData 
                        ? data 
                        : JSON.stringify(data) 
                    : undefined

    const response = await fetch(url, {method, headers, body})

    if(secure){
        if(response.status === 401 && refresh_token){
            const refresh_response = await fetch(ENDPOINT.ADMIN.refresh, {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({refresh:refresh_token})
            })
            if(refresh_response.ok){
                const tokens = await refresh_response.json()

                localStorage.setItem('access_token',  tokens.access)
                localStorage.setItem('refresh_token', tokens.refresh)

                headers['Authorization'] = `Bearer ${tokens.access}`
                response = await fetch(url, { method, headers, body })
            }else{
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = ROUTES.ADMIN.LOGIN;
                return;
            }
        }
    }

    const response_content_type = response.headers.get("Content-Type") || ""
    const is_json               = response_content_type.includes("application/json") 
    const response_data         = is_json ? await response.json() : await response.text()

    if (!response.ok) {
        const error = new Error(response_data?.detail || response.statusText);
        error.status = response.status;
        error.data   = response_data;
        throw error;
    }

    return response_data
    
}