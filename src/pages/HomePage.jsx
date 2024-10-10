import { useEffect, useRef, useState } from "react"
import useFetch from "../utils/hooks/useFetch"
import { useAuth } from "../utils/authContext"
import { useNavigate } from "react-router-dom"

const Homepage = () => {

    const navigate = useNavigate()
    const[blogs, setBlogs] = useState([])
    const modalRef = useRef(null)
    const {token,isAuthenticated} = useAuth()
    const {get} = useFetch('posts',token)
    const {post : postBlog} = useFetch('post',token)
    const [postData,setPostData] = useState({
        title:"",
        content:"",
        publish: false
    })

    const handleNewPostChange = (e) => {


        let { name, value, type, checked } = e.target;

        // Convert checkbox value to boolean
        if (type === "checkbox") {
        value = checked;
        }

        setPostData((prevPostData) => ({
        ...prevPostData,
        [name]: value,
        }));

    }


    useEffect( ()=>{

        if(!isAuthenticated) {
            navigate('/login')
        }


        async function getBlogs(){

            const response = await get()


            const data = await response.json()

            setBlogs(data.posts)

        }
        
        getBlogs()

    },[]) 

    function openAddPostModal(){
    
        modalRef.current.showModal()
    
    
    }


    async function newPostSubmit(e){
        e.preventDefault()

        console.log(postData)


        try {

            const response = await postBlog(postData)

            if(response.ok){

                console.log("New post added")
                modalRef.current.close()

            }

            
        } catch (error) {
            console.log(error)
        }

    }

    function openBlogEditModal(blog){

        console.log(blog)

        setPostData(
                {title: blog.title,
                content: blog.content,
                publish: blog.published
        })

        modalRef.current.showModal()

    

    }
    

    

    return (
        <div>
            <h1>POSTS </h1>

            <dialog id="my_modal_4" className="modal" ref={modalRef}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Fill the form to Add Post</h3>
                    
                    <form className="form-control gap-5 w-auto">
                        {/* if there is a button, it will close the modal */}

                        <div>

                        <label htmlFor="title" className="label">Title: </label>
                        <input id="title" type="text" className="input input-bordered  md:w-64" placeholder="Enter Post Title" name="title" onChange={handleNewPostChange} value={postData.title}/>
                        </div>

                        
                            <label htmlFor="content">Content: </label>
                            <textarea name="content" id="content" className="textarea textarea-bordered" onChange={handleNewPostChange} value={postData.content} placeholder="Write your contents here..." ></textarea>
                        
                        


                        <label className="label cursor-pointer md:w-64">
                            <span className="label-text">Published</span>
                            <input type="checkbox" className="toggle"  name="publish"  onChange={handleNewPostChange} checked={postData.publish}/>
                        </label>


                        <button className="btn" onClick={newPostSubmit}>Close</button>
                    </form>
                    
                </div>
            </dialog>

            <button className="btn" onClick={openAddPostModal}>Add Post</button>
            <div className="divider divider-primary">All Blogs</div>

            <div className="w-full flex items-center justify-center flex-wrap gap-5 ">

                { blogs.map( (blog) => {

                        return <div key={blog.id} className="card bg-neutral text-neutral-content w-96">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{blog.title}</h2>
                                        <p className="text-left">{`${blog.content.slice(0,150)}...`}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary" onClick={() => {openBlogEditModal(blog)}}>Edit</button>
                                            <button className="btn btn-warning">Delete</button>
                                        </div>
                                    </div>
                                </div>

                    })}

            </div>
        
        
        </div>
    )
}

export default Homepage