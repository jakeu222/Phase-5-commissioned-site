import { useState, useEffect } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Pages/Layout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'
import Listings from './Pages/Listings'
import Financing from './Pages/Financing'
import useUserStore from "../src/hooks/userStore";
import EditProfile from './Pages/EditProfile'


function App() {

  const [listingsData, setListingsData] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => setListingsData(data))
  }, []);

  const filteredListings = listingsData.filter(listing => {
    return listing.description.toLowerCase().includes(searchName.toLowerCase())
  })

  const router = createBrowserRouter(createRoutesFromElements(
    <Route to="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/editprofile' element={<EditProfile />} />
      <Route path='/listings' element={<Listings listingsData={filteredListings} />} />
      <Route path='/financing' element={<Financing />} />
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
