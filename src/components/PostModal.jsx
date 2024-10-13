/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

const PostModal = ({isOpen, onClose, onSubmit, initialData}) => {


    const [postData, setPostData] = useState({
        id: null,
        title: "",
        content: "",
        published: false
    })

    useEffect(() => {

        if(initialData.id !== null ){
            setPostData(initialData)
        }else{
            setPostData({id:null, title: "", content: "", published:false})
        }

    },[initialData])


    const handlePostChange = (e) =>{
        
        const {name, value, type, checked} = e.target

        setPostData( prev => ({
            ...prev,
            [name] : type == "checkbox" ? checked : value
        }))

    }


    const handleSubmit = (e) => {

        e.preventDefault()
        onSubmit(postData)

    }


    if(!isOpen) return null


    return (
        <dialog id="my_modal_4" className="modal modal-open" >
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Fill the form to Add Post</h3>
                    
                    <form className="form-control gap-5 w-auto" onSubmit={handleSubmit}>


                        <div>

                        <label htmlFor="title" className="label">Title: </label>
                        <input id="title" type="text" className="input input-bordered  md:w-64" placeholder="Enter Post Title" name="title" onChange={handlePostChange} value={postData.title}/>
                        </div>

                        
                            <label htmlFor="content">Content: </label>
                            <textarea name="content" id="content" className="textarea textarea-bordered" onChange={handlePostChange} value={postData.content} placeholder="Write your contents here..." ></textarea>
                        
                        


                        <label className="label cursor-pointer md:w-64">
                            <span className="label-text">Published</span>
                            <input type="checkbox" className="toggle"  name="published"  onChange={handlePostChange} checked={postData.published}/>
                        </label>


                        <button type="submit" className="btn" > {postData.id ? "Update" : "Add"} Post</button>
                    </form>
                    
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => onClose()}>X</button>
                </div>
            </dialog>

    )
}

export default PostModal