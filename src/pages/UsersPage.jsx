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


  function handleOpenModal (user) {
    setIsModalOpen(true)
    setCurrentUser(user)
  }


  function handleCloseModal () {

    setIsModalOpen(false)
    setCurrentUser(false)

  }


  async function handleSubmitUser(userId, data){


    try {
        const user = await post(`/user/${userId}`,{role : data })
        console.log('Updated ',user)

    } catch (error) {

      console.error("Failed to update user in DB",error);
      


    }

  }

  console.log("CURRENT USER: ", currentUser )


  return (
    <div>

      {!users ?  <h1>loading...</h1> :

      users.map((user)=> 
        <div key={user.id} className="mb-5" >
          <h1 className="card-title">{user.username}</h1>
          <h2>{user.email}</h2>
          <h3>{user.role}</h3>


          <button className="btn btn-primary btn-sm" onClick={() => {  handleOpenModal(user) } }>Edit User</button>
        </div>
      )
      }
      <UserModal isOpen={isModalOpen} user={currentUser} onClose = {handleCloseModal} onSubmit = {handleSubmitUser}/>
    </div>
  )
}

export default UsersPage