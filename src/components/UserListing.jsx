import { useEffect, useState } from "react"
import User from "./User"
import { useSearchParams } from "react-router-dom"



// eslint-disable-next-line react/prop-types
const UserListing = ({users=[],handleOpenModal}) => {

  const [filteredUsers,setFilteredUsers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()


  const searchQuery = searchParams.get("username") ||  ""

useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]); // Reset if users array is empty
    }
  }, [users, searchQuery]);



  function handleSearchChange (e){
    const query = e.target.value

    setSearchParams({username : query})
  }






  const Users = filteredUsers.map((user) => (<User key={user.id} user={user} handleOpenModal={handleOpenModal} />))

  return (
    <>


      <label htmlFor="search" className="label-text">
          Search Username: 
            <input className="input-sm input-secondary ml-3" type="search" name="search" id="search" onChange={handleSearchChange}/>
        </label>

      <div className=" container flex flex-row  justify-center items-center p-3 mt-5 gap-5 flex-wrap">
        {filteredUsers.length > 0 ? Users : <h1>loading...</h1> }
      </div>
      
    </>  
  
  )
}

export default UserListing