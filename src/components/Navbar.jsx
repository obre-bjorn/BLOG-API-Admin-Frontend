import { Link } from "react-router-dom"

const Navbar = () => {


    return (
        <div className="navbar bg-base-100 px-8">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">OBRE BLOG ADMIN</a>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1">
                <li><Link to="/">Posts</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li>
                    <details>
                    <summary>Parent</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                        <li>
                            <Link>Logout</Link>
                        </li>
                        <li><a>Link 2</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar