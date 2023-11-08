import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../hooks/userStore";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { updateUser } = useUserStore();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObject = { username: username, password: password };

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObject),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.json()}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                updateUser(data);
                nav("/profile");
            })
            .catch((error) => {
                console.log("error", error.message);
            });
    };

    return (
        <div className="relative w-full min-h-screen">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)',
                }}
            >
                <div className="max-w-md w-full space-y-8 p-4 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-3xl text-center font-bold mb-4">Login</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="text-sm font-medium text-gray-600">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="text-sm font-medium text-gray-600">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-md"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;






// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // import './LogIn.css'
// import useUserStore from "../hooks/userStore";

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const { user, updateUser } = useUserStore();

//     const nav = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const userObject = { "username": username, "password": password }

//         fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userObject)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`${response.json()}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data);
//                 updateUser(data)
//                 nav("/profile");
//             })
//             .catch(error => {
//                 console.log("error", error.message);
//             })
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit} id='logInForm'>
//                 <h2 id='logInTitle'>Login</h2>
//                 <div className="input-group">
//                     <label className="logInLabel">Username:</label>
//                     <input
//                         className="logInInput"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="input-group">
//                     <label className="logInLabel">Password:</label>
//                     <input
//                         className="logInInput"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" id="logInButton">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;