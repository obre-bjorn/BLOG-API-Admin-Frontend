/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {jwtDecode } from "jwt-decode";



export const AuthContext = createContext()



function useProviderAuth (){

    const [token, setToken] = useState(() => localStorage.getItem('token'))

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

    function logout(){
        localStorage.removeItem('token')
        setToken(null)

    }


    const isAuthenticated = () => {
        if(!token) {
            return false
        }

        const decodedToken = jwtDecode(token)
        const currentTime = Date.now()/1000

        if (decodedToken.exp < currentTime) {
            logout(); // Automatically log out if token is expired
            return false;
        }

        return true
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