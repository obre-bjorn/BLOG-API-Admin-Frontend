/* eslint-disable react/prop-types */

const Comment = ({comment}) => {


  return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-md">{comment.author.username}</h3>
            <p className="text-gray-700">{comment.content}</p>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
  )
}

export default Comment