import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
    const [favorite, setFavorite] = useState(false);
    const nav = useNavigate();

    const toggleFavorite = () => {
        setFavorite(!favorite);
    }

    const handleDelete = () => {
        fetch(`/api/events/${event.id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
            })
            .catch((error) => {
                console.log("error", error.message);
            });
    };

    return (
        <li className="border rounded-md p-4 my-2 bg-white shadow-md flex justify-between items-center">
            <p className="text-lg text-black font-bold">{event.event_name}</p>
            <div className="flex-grow text-black">
                <strong>{event.description}</strong>
                <span className="text-black"> · {event.location}</span>
            </div>
            <div className="space-x-2">
                <button onClick={toggleFavorite} className={`emoji-button favorite ${favorite ? 'active' : ''}`}>
                    {favorite ? "★" : "☆"}
                </button>
                <button
                    onClick={() => nav(`/editevent/${event.id}`)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                    Delete Event
                </button>
            </div>
        </li>
    );
}

export default EventCard;
