import React from 'react'
import EventCard from './EventCard.jsx'
import { useNavigate } from 'react-router-dom'

function EventContainer({ eventsData }) {
    const nav = useNavigate();
    console.log(eventsData)
    return (
        <div className='eventsContainer'>
            {eventsData.map(event => <EventCard key={event.id} event={event} />)}
            <button onClick={() => nav('/eventform')}>Go to Events</button>
        </div>
    );
}

export default EventContainer