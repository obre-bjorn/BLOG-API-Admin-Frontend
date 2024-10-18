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

  function handleSearchUsername (e) {

    e.preventDefault()



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
    <div className="container mx-auto flex flex-col items-center ">



      <form action="" onSubmit={handleSearchUsername}>
      <label htmlFor="search" className="label-text">
        Search Username: 
          <input className="input-sm input-secondary ml-3" type="search" name="search" id="search" />
      </label>
      </form>

      <div className="divider divide-primary my-10">Users</div>

    <div className=" container flex flex-row  justify-center items-center p-3 gap-5 flex-wrap">


      {!users ?  <h1>loading...</h1> :

      users.map((user)=> 
        <div key={user.id} className="mb-5 card w-80 max-w-lg" >
          <h1 className="card-title">{user.username}</h1>
          <h2>{user.email}</h2>
          <h3>{user.role}</h3>


          <button className="btn btn-primary btn-sm " onClick={() => {  handleOpenModal(user) } }>Edit User</button>
        </div>
      )
      }
      <UserModal isOpen={isModalOpen} user={currentUser} onClose = {handleCloseModal} onSubmit = {handleSubmitUser}/>
    </div>

    </div>
  )
}

export default UsersPage