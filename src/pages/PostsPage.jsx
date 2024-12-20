import { useState } from "react"
import { usePosts } from "../utils/hooks/usePosts"

import PostModal from "../components/PostModal"
import PostListing from "../components/PostListing"




const PostsPage = () => {


    const {blogs,addPost, deletePost, updatePost} = usePosts()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState({
        id: null,
        title: "",
        content: "",
        published: false
    }) 




    const handleOpenModal = (post = {
        id: null,
        title: "",
        content: "",
        published: false
    }) => {
        
        setIsModalOpen(true)
        setCurrentPost(post)

    }

  


    const handleCloseModal = () =>{
        setIsModalOpen(false)
        setCurrentPost({
        id: null,
        title: "",
        content: "",
        published: false
    })

    }


    const handleSubmitPost = async (postData) => {
        let success 

        if(postData.id){
            success = await updatePost(postData.id, postData)
        }else{
            success = await addPost(postData)
        }

        if(success){
            handleCloseModal()
        }
    }

    const handleDeletePost = async (id) => {

        if(window.confirm("Are you sure you want to delete this post?")){

            await deletePost(id)

        }


    }
    

    

    return (
        <div className="p-8">

            <button className="btn" onClick={() => handleOpenModal()}>Add Post</button>

            <div className="divider divide-primary">All BLogs</div>

            <PostListing blogs={blogs} onEdit={handleOpenModal} onDelete={handleDeletePost}/>
            <PostModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitPost} initialData={currentPost}/>
        
        
        </div>
    )

}

export default PostsPage