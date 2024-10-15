/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/authContext"
import useFetch from "../utils/hooks/useFetch"

const Comment = ({comment, postId}) => {


  const {token} = useAuth()
  const {del} = useFetch(token)
  const navigate = useNavigate()



  const handleCommentDelete = async () => {


    const response = await del(`/post/${postId}/comment/${comment.id}`)


    if(response.ok) {

      console.log("Succesfully deleted Post")
      navigate(`/post/${comment.id}`)

      return 

    }

    console.error("Error deleting comment" )
    
  }
 

  return (

        <div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between">

          <div>
            <h3 className="font-bold text-md">{comment.author.username}</h3>
            <p className="text-gray-700">{comment.content}</p>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>

            <button className="btn btn-warning " onClick={handleCommentDelete}>
              Delete
            </button>
          </div>
          
        </div>
  )
}

export default Comment