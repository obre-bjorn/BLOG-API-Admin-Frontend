import { createContext, useContext, useState } from "react";
import useFetch from "./hooks/useFetch";


export const AuthContext = createContext()



function useProviderAuth (){

    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const {post} =  useFetch('login','',{})



    async function login(formData){

        try {
        
            const response = await post(formData)

            if(!response.ok){

                throw new Error("Error logging in")
                
            }
            
            const data = await response.json()
            localStorage.setItem('token', data.token)

            setToken(data.token)


        } catch (error) {
            
            console.log(error)
        } 


    }

    const isAuthenticated = !!token 

    function logout(){
        localStorage.removeItem('token'),
        setToken(null)

    }

    return {
        token,
        isAuthenticated,
        login,
        logout
    }
}


export const AuthProvider = ({children}) => {

    const auth = useProviderAuth()


    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>


}

export const useAuth  = () => {

    const context = useContext(AuthContext)

    return context

}