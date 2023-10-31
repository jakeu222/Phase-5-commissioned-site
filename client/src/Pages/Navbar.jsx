import { React } from 'react'
import useUserStore from "../../hooks/userStore";
import { NavLink } from 'react-router-dom'
import '../navbar/NavBar.css'

function NavBar() {
    const { user, deleteUser } = useUserStore();

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
        <header>
            <nav>
                <NavLink to='/profile'>Profile</NavLink>
                <NavLink to='/listings'>Listings</NavLink>
                <NavLink to='/' onClick={() => {
                    fetch("/api/logout", { method: "DELETE" })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response error");
                            }
                        })
                        .then(() => {
                            deleteUser()
                        })
                }}>Log Out</NavLink>
            </nav>
        </header>
    )
    return user ? loggedInNavBar : loggedOutNavBar

}

export default NavBar