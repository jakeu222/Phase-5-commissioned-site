import React, { useState } from "react";
function EventCard({ event, }) {
    // const [favorite, setFavorite] = useState(false)

    // const toggleFavorite = () => {
    //     setFavorite(!favorite);
}
return (
    <li className="card">
        <div >
            <p>{event.title}</p>
            <strong>{event.description}</strong>
            <span> · {event.location}</span>
            <p>{event.price}</p>
            <span className="price">$0</span>
            {/* <img src={listing.image} alt={listing.name} /> */}
        </div>
        <div className="details">
            {favorite ? (
                <button onClick={toggleFavorite} className="emoji-button favorite active">★</button>
            ) : (
                <button onClick={toggleFavorite} className="emoji-button favorite">☆</button>
            )}

            {/* <button onClick={handleDelete} className="emoji-button delete">🗑</button> */}
        </div>
    </li>
);
}

export default ListingCard;

