import { useAuth } from "../authContext"
import { useCallback } from "react"


const API_BASE_URL = "http://localhost:5000"


const useFetch = (token) => {


    const {logout}  = useAuth()

    const handleResponse = useCallback(async (response) => {

        if(response.status === 401){

            logout()
            throw new Error('Unauthorized')



        }

        return response

    },[])



    const fetchWithAuth = useCallback(async (url, options = {}) =>{

        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers:{
                ...options.headers,
                Authorization: token
            }
        })

        return handleResponse(response);

    },[token,handleResponse])


    const get = useCallback((endpoint) => fetchWithAuth(endpoint), [fetchWithAuth])

    const post = useCallback((endpoint,data) => fetchWithAuth(endpoint, {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    }),[fetchWithAuth])
    
    
    const put = useCallback((endpoint,data) => fetchWithAuth(endpoint, {
        method : 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    }),[fetchWithAuth])

    const del = useCallback((endpoint) => fetchWithAuth(endpoint, {
        method: 'DELETE',
    }),[fetchWithAuth])



    return{get,post,put,del,}
}


export default useFetch