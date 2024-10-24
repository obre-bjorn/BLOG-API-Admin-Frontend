import { useState,useEffect } from "react"


import UserModal from "../components/UserModal";
import useFetch from "../utils/hooks/useFetch";
import { useAuth } from "../utils/authContext";

import UserListing from "../components/UserListing";


const UsersPage = () => {
  const {token} = useAuth()
  const [users,setUsers] = useState([])
  const {post} = useFetch(token)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
 

  useEffect(() => {

    const fetchUsers = async () => {

      const response = await fetch('http://localhost:5000/users')

      const data = await response.json()

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




  return (
    <div className="container mx-auto flex flex-col items-center ">

      <UserListing users={users} handleOpenModal={handleOpenModal}/>

      <UserModal isOpen={isModalOpen} user={currentUser} onClose = {handleCloseModal} onSubmit = {handleSubmitUser}/>

    </div>
  )
}

export default UsersPage