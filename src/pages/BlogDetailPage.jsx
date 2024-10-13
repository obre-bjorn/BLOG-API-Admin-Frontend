import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import CommentListing from "../components/CommentListing"


const BlogDetailPage = () => {
  const {postId} = useParams()
  const [blog,setBlog] = useState(null)


  useEffect(() => {

    const fetchBlodDetail = async () => {
  
      const response = await fetch(`http://localhost:5000/post/${postId}`)

      const data = await response.json()
      
      setBlog(data.post)
  
    }
  
  
    fetchBlodDetail()
  },[])

  const navigate = useNavigate();

  
  console.log(blog)


  return (

    !blog ? <h1>Loading...</h1>:  
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">

        {/* Blog Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

          {/* Author Section */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-medium">{blog.author.username}</h2>
              <p className="text-sm text-gray-500">{blog.author.email}</p>
            </div>
          </div>

          {/* Blog Body */}
          <div className="prose prose-lg max-w-none">
            <p>{blog.content}</p>
          </div>
        </div>

        <CommentListing  comments={blog.comments}/>

        {/* Navigation Buttons */}
        <div className="p-8 flex justify-between">
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            Back to Blogs
          </button>
          <button className="btn btn-primary">Share Post</button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage