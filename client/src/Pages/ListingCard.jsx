import { list } from "postcss";
import React, { useState } from "react";

function ListingCard({ listing }) {
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

    return (
        <li className="bg-white  shadow-md p-4 mb-4">
            <div className="mb-2">


                <h2 className="text-xl font-semibold">{listing.title}</h2>
                <img src={listing.image_url} alt="" />
                <p className="text-gray-500">{listing.description}</p>
                <p className="text-gray-500">Location: {listing.location}</p>
            </div>
            <div className="text-2xl font-bold text-pink-500 mb-2">
                Price: ${listing.price}
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






// import React, { useState } from "react";
// function ListingCard({ listing, }) {
//     const [favorite, setFavorite] = useState(false)

//     const toggleFavorite = () => {
//         setFavorite(!favorite);
//     }
//     return (
//         <li className="card">
//             <div >
//                 <p>{listing.title}</p>
//                 <strong>{listing.description}</strong>
//                 <span> · {listing.location}</span>
//                 <p>{listing.price}</p>
//                 <span className="price">$0</span>
//                 {/* <img src={listing.image} alt={listing.name} /> */}
//             </div>
//             <div className="details">
//                 {favorite ? (
//                     <button onClick={toggleFavorite} className="emoji-button favorite active">★</button>
//                 ) : (
//                     <button onClick={toggleFavorite} className="emoji-button favorite">☆</button>
//                 )}

//                 {/* <button onClick={handleDelete} className="emoji-button delete">🗑</button> */}
//             </div>
//         </li>
//     );
// }

// export default ListingCard;
