import React from 'react';
import EventCard from './EventCard.jsx';
import { useNavigate } from 'react-router-dom';

function EventContainer({ eventsData }) {
    const nav = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-hero bg-cover" style={{ backgroundImage: 'url(https://www.tileclub.com/cdn/shop/files/roman-flower-blue-celeste-marble-mosaic-tile-kitchen-new-colorway.jpg?v=1684529970)' }}>

            <div className="container mx-auto p-4 border rounded-md items-center bg-white shadow-md ">
                <h2 className="text-3xl text-black text-center font-bold mb-4">Events</h2>
                <button
                    onClick={() => nav('/eventform')}
                    className=" py-2 px-4 bg-pink-500 hover:bg-pink-700 text-white font-bold rounded-md mb-4"
                >
                    Create Event!
                </button>
                <div className="space-y-4">
                    {eventsData.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventContainer;
