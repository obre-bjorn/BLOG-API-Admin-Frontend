import { useState } from "react";



const useFetch = (url,token, options={}) => {

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)




    const fetchData = async (fetchOptions) => {

        setLoading(true)
        setError(null)



        try {
            
            const response = await fetch(`http://localhost:5000/${url}`, {
                ...options,
                ...fetchOptions,
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization : token ? token : '',
                    ...options.headers
                }})


                return response



        } catch (error) {
            
            setError(error)

        } finally {
            setLoading(false)
        }

    }

    return{
        loading,
        error,
        get  : () => fetchData({method : "GET" }),  
        post : (body) => fetchData({method:"POST", body: JSON.stringify(body)}),
        put : (body) => fetchData({method : "PUT", body : JSON.stringify(body)}),
        del : () => fetchData({method : "DELETE"})


    }
}


export default useFetch