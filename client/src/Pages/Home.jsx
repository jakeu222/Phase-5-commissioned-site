import React, { useEffect } from 'react'
// import '../home/Home.css'
import { useNavigate } from "react-router-dom";

import useUserStore from "../hooks/userStore";

function Home() {
    const nav = useNavigate();
    const { user } = useUserStore();
    // useEffect(() => {
    //     if (user != undefined) {
    //         nav('/profile')
    //     }
    // }, [])

    return (
        <div className='Home-container'>

            <h1 className='Title-container'>Welcome to Real estate</h1>
            <p className='Description-container'>
                stuff for description
            </p>

        </div>
    )
}

export default Home