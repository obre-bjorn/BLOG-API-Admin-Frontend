/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const UserModal = ({isOpen,onClose, onSubmit, user}) => {


    const [admin, setAdmin] = useState(user.role == "ADMIN")

    useEffect ( () => {

        setAdmin(user.role == "ADMIN")

    },[user])


    const handleUserChange = () => {

        setAdmin((prev) => !prev)

    }

   function handleSubmit (e) {

    e.preventDefault()
    const role = admin ? "ADMIN" : "USER" 

    onSubmit(user.id, {role : role})

   }


    if(!isOpen) return null

    return (
        <dialog id="my_modal_4" className="modal modal-open" >
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Configure User Settings</h3>

                    
                    
                    <form className="form-control gap-5 w-auto" onSubmit={handleSubmit}>


                        <label className="label cursor-pointer md:w-64">
                            <span className="label-text">Is Admin:</span>
                            <input type="checkbox" className="toggle"  name="published"  onChange={handleUserChange} checked={admin}/>
                        </label>


                        <button type="submit" className="btn" >Update User</button>
                    </form>
                    
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => onClose()}>X</button>
                </div>
            </dialog>
    )
}

export default UserModal