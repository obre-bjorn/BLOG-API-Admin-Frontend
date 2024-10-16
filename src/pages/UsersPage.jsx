import { useState,useEffect } from "react"


import UserModal from "../components/UserModal";
import useFetch from "../utils/hooks/useFetch";
import { useAuth } from "../utils/authContext";


const UsersPage = () => {
  const {token} = useAuth()
  const [users,setUsers] = useState(null)
  const {post} = useFetch(token)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  

  useEffect(() => {

    const fetchUsers = async () => {

      const response = await fetch('http://localhost:5000/users')

      const data = await response.json()
      console.log(data)

      setUsers(data.users)

    }

    fetchUsers()
  }, []);


  function handleOpenModal (user=false) {
    setIsModalOpen(true)
    setCurrentUser(user)
  }


  function handleCloseModal () {

    setIsModalOpen(false)
    setCurrentUser(false)

  }


  async function handleSubmitUser(){


    try {
        const user = await post("http://localhost:5000/user/",)
        console.log('Updated ',user)

    } catch (error) {

      console.error("Failed to update user in DB",error);
      


    }



  }


  return (
    <div>

      {!users ?  <h1>loading...</h1> :

      users.map((user)=> 
        <div key={user.id} className="mb-5" >
          <h1 className="card-title">{user.username}</h1>
          <h2>{user.email}</h2>
          <h3>{user.role}</h3>


          <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal(user.role == "ADMIN")}> Edit User</button>
          <UserModal isOpen={ () => {isModalOpen(user)}} data={currentUser} onClose = {handleCloseModal} onSubmit = {handleSubmitUser}/>
        </div>
      )
      }
    </div>
  )
}

export default UsersPage