/* eslint-disable react/prop-types */
import { useState } from "react"

const UserModal = ({isOpen,onClose, onSubmit, data}) => {


    const [role, setRole] = useState(data.role)



    const handleUserChange = () => {

        setRole((prev) => setRole(!prev))

    }

   function handleSubmit (e) {
    e.preventDefault()
    onSubmit(data.id)

   }


    if(!isOpen) null

    return (
        <dialog id="my_modal_4" className="modal modal-open" >
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Fill the form to Add Post</h3>

                    
                    
                    <form className="form-control gap-5 w-auto" onSubmit={handleSubmit}>


                        <label className="label cursor-pointer md:w-64">
                            <span className="label-text">Is Admin:</span>
                            <input type="checkbox" className="toggle"  name="published"  onChange={handleUserChange} checked={role}/>
                        </label>


                        <button type="submit" className="btn" >Update User</button>
                    </form>
                    
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => onClose()}>X</button>
                </div>
            </dialog>
    )
}

export default UserModal