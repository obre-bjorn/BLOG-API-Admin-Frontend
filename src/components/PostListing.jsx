/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Post from "./Post"



const PostListing = ({blogs,onEdit,onDelete}) => {

    const Posts = blogs.map(
                        blog => <Link to={`/post/${blog.id}`} key={blog.id}>
                            <Post key={blog.id} blog={blog} onEdit={onEdit} onDelete={onDelete}/>
                        </Link>
            )



  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-5 ">
        {Posts}
    </div>
  )
}

export default PostListing