import React from 'react'
import ListingCard from './ListingCard'

function Listing({ listingsData }) {
    console.log(listingsData)
    return (
        <div className='listings'>
            {listingsData.map(listing => <ListingCard key={listing.id} listing={listing} />)}
        </div>
    );
}

export default Listing