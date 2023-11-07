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
import Events from './Pages/Events';
import EditEvent from './Pages/EditEvents'
import EventContainer from './Pages/EventContainer'

function App() {

  const [listingsData, setListingsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => setListingsData(data))
  }, []);

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEventsData(data))
  }, []);

  function updateEvents(id, newEvent) {
    console.log(id)
    console.log(newEvent)
    // const newEventList = eventsData.map(maEvent => maEvent.id === id ? newEvent : maEvent)
    const newEventList = eventsData.filter(fiEvent => fiEvent.id !== id)
    console.log(newEventList)
    // setEventsData(newEventList);
  }
  const filteredListings = listingsData.filter(listing => {
    return listing.description.toLowerCase().includes(searchName.toLowerCase())
  })
  const filteredEvents = eventsData.filter(event => {
    return event.description.toLowerCase().includes(searchName.toLowerCase())
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
      <Route path='/eventform ' element={<Events />} />
      <Route path='/events' element={<EventContainer eventsData={eventsData} />} />
      <Route path='/editevent/:eventId' element={<EditEvent updateEvents={updateEvents} />} />
      {/* <Route path='/eventscontainer' element={<EventContainer listingsData={filteredEvents} />} /> */}

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
