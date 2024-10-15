import { useState,useEffect } from "react"


const UsersPage = () => {

  const [users,setUsers] = useState(null)
  

  useEffect(() => {

    const fetchUsers = async () => {

      const response = await fetch('http://localhost:5000/users')

      const data = await response.json()
      console.log(data)

      setUsers(data.users)



    }

    fetchUsers()
  }, []);



    const handleEditUser = (user.id) => {



      






    }

  return (
    <div>

      {!users ?  <h1>loading...</h1> :

      users.map((user)=> 
        <div key={user.id} className="mb-5" >
          <h1 className="card-title">{user.username}</h1>
          <h2>{user.email}</h2>
          <h3>{user.role}</h3>


          <button className="btn btn-primary btn-sm"> Edit User</button>
        </div>
      )
      }
    
    </div>
  )
}

export default UsersPage