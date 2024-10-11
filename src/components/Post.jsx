/* eslint-disable react/prop-types */


const Post = ({blog, onEdit, onDelete}) => {





    return (
        <div key={blog.id} className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{blog.title}</h2>
                <p className="text-left">{`${blog.content.slice(0,150)}...`}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => onEdit(blog)}>Edit</button>
                    <button className="btn btn-warning" onClick={ () => onDelete(blog.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post