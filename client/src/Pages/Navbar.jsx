import { React } from 'react'
import useUserStore from "../hooks/userStore";
import { NavLink } from 'react-router-dom'
import userTile from '../assets/userTile.svg'
import { useNavigate } from 'react-router';


function NavBar() {
    const { user, deleteUser } = useUserStore();
    const nav = useNavigate()

    const loggedOutNavBar = (
        <header >
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </nav>
        </header>
    )
    const loggedInNavBar = (
        <div className="navbar  bg-base-100">
            <div className="flex-1">
                <button onClick={() => nav('/')} className="btn btn-ghost normal-case text-xl">Home</button>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={userTile} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        {/* <li><NavLink to="/">Home</NavLink></li> */}
                        <li><NavLink to='/listings'>Listings</NavLink></li>
                        <li><NavLink to='/' onClick={() => {
                            fetch("/api/logout", { method: "DELETE" })
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Network response error");
                                    }
                                })
                                .then(() => {
                                    deleteUser()
                                })
                        }}>Log Out</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>

    )
    return user ? loggedInNavBar : loggedOutNavBar

}

export default NavBar


// <header >
//             <nav className='flex justify-around bg-red-400 text-lg'>
//                 <NavLink to='/profile'>Profile</NavLink>
//                 <NavLink to='/listings'>Listings</NavLink>
//                 <NavLink to='/' onClick={() => {
//                     fetch("/api/logout", { method: "DELETE" })
//                         .then((response) => {
//                             if (!response.ok) {
//                                 throw new Error("Network response error");
//                             }
//                         })
//                         .then(() => {
//                             deleteUser()
//                         })
//                 }}>Log Out</NavLink>
//             </nav>
//         </header>