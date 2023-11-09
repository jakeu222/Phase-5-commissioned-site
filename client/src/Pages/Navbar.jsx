import React from 'react';
import useUserStore from '../hooks/userStore';
import { NavLink } from 'react-router-dom';
import userTile from '../assets/userTile.svg';
import { useNavigate } from 'react-router';

function NavBar() {
    const { user, deleteUser } = useUserStore();
    const nav = useNavigate();

    const homeButton = (
        <button
            onClick={() => nav('/')}
            className="btn btn-ghost normal-case text-xl"
            style={{ width: '100px', height: '40px' }}
        >
            <img className="logo-home" src="https://christopher1farwell.files.wordpress.com/2013/05/chrisroof.png" alt="Logo" />

        </button>
    );

    const loggedOutNavBar = (
        <div>
            <header>
                <div className="navbar bg-gradient-to-r from-pink-200 to-white text-black">
                    <div className="flex-1">
                        {homeButton}
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control"></div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={userTile} alt="User Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <NavLink to='/login'>login</NavLink>
                                </li>
                                <li><NavLink to='/signup'>signup</NavLink></li>
                                <li><NavLink to='/listings'>Listings</NavLink></li>
                                <li><NavLink to='/Events'>Events</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );

    const loggedInNavBar = (
        <div className="navbar bg-gradient-to-r from-pink-200 to-white text-black">
            <div className="flex-1">
                {homeButton}
            </div>
            <div className="flex-none gap-2">
                <div className="form-control"></div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={userTile} alt="User Avatar" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li><NavLink to='/listings'>Listings</NavLink></li>
                        <li><NavLink to='/financing'>Financing</NavLink></li>
                        <li><NavLink to='/Events'>Events</NavLink></li>
                        <li>
                            <NavLink to='/' onClick={() => {
                                fetch("/api/logout", { method: "DELETE" })
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error("Network response error");
                                        }
                                    })
                                    .then(() => {
                                        deleteUser();
                                    });
                            }}>
                                Log Out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

    return user ? loggedInNavBar : loggedOutNavBar;
}

export default NavBar;
