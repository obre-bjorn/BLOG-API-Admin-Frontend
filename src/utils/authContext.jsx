/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";



export const AuthContext = createContext()



function useProviderAuth (){

    const [token, setToken] = useState(localStorage.getItem('token') || null)


    async function login(formData){

        try {
        
            const response = await fetch('http://localhost:5000/login', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(formData), // Sending login credentials
                                        });

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