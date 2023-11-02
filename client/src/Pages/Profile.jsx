import React, { useEffect, useState } from 'react';
import useUserStore from '../hooks/userStore';
import { useNavigate } from 'react-router';
// import EditProfile from './Pages/EditProfile'
function Profile() {

    const { user } = useUserStore()

    const nav = useNavigate()



    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <strong>Username:</strong> {user.username}
            </div>
            <div>
                <strong>Email:</strong> {user.email}
            </div>
            <div>
                <strong>First Name:</strong> {user.first_name}
            </div>
            <div>
                <strong>Last Name:</strong> {user.last_name}
            </div>
            <div>
                <strong>Buyer:</strong> {user.buyer ? 'Yes' : 'No'}
            </div>
            <div>
                <strong>Age:</strong> {user.age}
            </div>
            <div>
                <strong>City:</strong> {user.city}
            </div>
            <br></br>
            <button onClick={() => nav('/EditProfile')} className='editAccountBtn'>Edit Account</button>
        </div>
    );
}

export default Profile;
