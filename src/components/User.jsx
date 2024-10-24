/* eslint-disable react/prop-types */

const User = ({user, handleOpenModal}) => {

    
  return (
    <div  className="mb-5 card w-80 max-w-lg gap-2" >
          <h1 className="card-title">{user.username}</h1>
          <h2>{user.email}</h2>
          <h3>{user.role}</h3>
          <button className="btn btn-primary btn-sm " onClick={() => {  handleOpenModal(user) } }>Edit User</button>
        </div>
  )
}

export default User