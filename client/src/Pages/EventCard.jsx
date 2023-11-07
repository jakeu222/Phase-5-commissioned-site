import React, { useState } from "react";
import { useNavigate } from 'react-router';
function EventCard({ event, }) {
    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        setFavorite(!favorite);
    }
    const nav = useNavigate()

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
        <li className="new-card">
            <div >
                <p>{event.event_name}</p>
                <strong>{event.description}</strong>
                <span> · {event.location}</span>

                {/* <img src={listing.image} alt={listing.name} /> */}
            </div>
            <div className="details">
                {favorite ? (
                    <button onClick={toggleFavorite} className="emoji-button favorite active">★</button>
                ) : (
                    <button onClick={toggleFavorite} className="emoji-button favorite">☆</button>
                )}

                <button onClick={() => nav(`/editevent/${event.id}`)}>Edit</button>
                <button onClick={handleDelete}>Delete Event</button>

            </div>
        </li>
    );
}

export default EventCard;
