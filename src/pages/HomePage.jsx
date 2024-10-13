import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/authContext"
import Navbar from "../components/Navbar"

const Homepage = () => {

    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
    },[isAuthenticated,navigate])


    return (
        <>
            <Navbar/>
            <Outlet/> 
        </>
    )
}

export default Homepage