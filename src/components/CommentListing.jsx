/* eslint-disable react/prop-types */
import Comment from "./Comment.jsx"

const CommentListing = ({comments, postId}) => {


  return (
    <div className="mt-10 p-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Comment key={comment.id} comment= {comment} postId={postId}/>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}
    </div>

  )
}

export default CommentListing