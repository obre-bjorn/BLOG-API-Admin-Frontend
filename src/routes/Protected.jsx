/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"


//Context 
import { useAuth } from "../utils/authContext"


export const Protected = () => {

    const {isAuthenticated} = useAuth()

    if(!isAuthenticated()){
        return <Navigate to="/login"/>
    }
    
    
    return (
    <>
        <Outlet/>
    </>
    )
}
