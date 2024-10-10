import { useState } from "react"
import { useAuth } from "../utils/authContext"
import { useNavigate } from "react-router-dom"

 const LoginPage = () => {


    const navigate = useNavigate()
    
    const [formData,setFormData] = useState({
        username: "",
        password: ""
    })

    const {login} = useAuth()




    function handleChange(e){

        const {name,value} = e.target

        setFormData({
            ...formData,
            [name] : value,
        })


    }



    async function handleSubmit(e){

        e.preventDefault()

        try {

            const response = await login(formData)

            if(response.ok){

                navigate('/')

            }

        

            
        } catch (error) {
            console.log("Login page: ",error)
        }
        


    }


  return (
    <div>
    <h1>Sign In </h1>
        <form action="">
            <label htmlFor="username">Username: </label>
            <input id="username" name="username" type="text" onChange={handleChange} required />

            <label htmlFor="password">Password: </label>
            <input id="password" name="password" type="password" onChange={handleChange} required/>

            <button onClick={handleSubmit}>Sign In</button>
        </form>

    </div>
  )
}

export default LoginPage