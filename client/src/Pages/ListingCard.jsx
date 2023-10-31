import React, { useState } from "react";
function ListingCard({ listing, }) {
    return (
        <li className="card">
            <div >
                <p>{listing.title}</p>
                <strong>{listing.description}</strong>
                <span> · {listing.location}</span>
                <p>{listing.price}</p>
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
