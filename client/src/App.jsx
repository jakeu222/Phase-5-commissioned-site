import { useState, useEffect } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Listings from './pages/Listings'
import Financing from './pages/Financing'

function App() {

  const [listingsData, setListingsData] = useState([]);

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => setListingsData(data))
  }, []);

  const filteredListings = listingsData.filter(listing => {
    return listing.description.toLowerCase().includes(searchName.toLowerCase())
  })
  console.log(filteredListings);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route to="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route index element={<Login />} />
      <Route index element={<SignUp />} />
      <Route index element={<Profile />} />
      <Route index element={<Listings listingsData={filteredListings} />} />
      <Route index element={<Financing />} />
    </Route>
  ))

  const { updateUser } = useUserStore();
  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => {
        data.username != undefined ? updateUser(data) : null;
        console.log("this is whos logged in", data);
      });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App







// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
