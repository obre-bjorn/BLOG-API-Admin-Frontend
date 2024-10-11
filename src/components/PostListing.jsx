/* eslint-disable react/prop-types */
import Post from "./Post"


const PostListing = ({blogs,onEdit,onDelete}) => {

    const Posts = blogs.map(
                        blog => 
                            <Post key={blog.id} blog={blog} onEdit={onEdit} onDelete={onDelete}
                        />)



  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-5 ">
        {Posts}
    </div>
  )
}

export default PostListing