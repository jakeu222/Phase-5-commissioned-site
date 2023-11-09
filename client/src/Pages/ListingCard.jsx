import React, { useState } from "react";

function ListingCard({ listing, onListingClick }) {
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    return (
        <li className="bg-white shadow-md  p-4 mb-4 " > {/* Adjusted max-w-sm for a smaller card */}
            <div className="mb-2  max-w-lg rounded-md items-center">
                <h2 className="text-xl font-semibold">{listing.title}</h2>
                <img src={listing.image_url} alt={listing.title} className="w-full h-48 object-cover rounded-md" />
                <p className="text-gray-500">{listing.description}</p>
                <p className="text-gray-500">Location: {listing.location}</p>
                <div className="text-2xl font-bold text-pink-500 mb-2">
                    Price: ${listing.price}
                </div>
            </div>
            <div className="flex justify-between items-center">
                {favorite ? (
                    <button
                        onClick={toggleFavorite}
                        className="bg-pink-500 text-white p-2 rounded-full"
                    >
                        ★
                    </button>
                ) : (
                    <button
                        onClick={toggleFavorite}
                        className="bg-gray-300 text-gray-600 p-2 rounded-full"
                    >
                        ☆
                    </button>
                )}
            </div>
        </li>
    );
}

export default ListingCard;
