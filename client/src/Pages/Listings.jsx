import React from 'react'
import ListingCard from './ListingCard'

function Listing({ listingsdata }) {
    return (
        <div className='listings'>
            {listingsdata.map(listing => <ListingCard key={listing.id} listing={listing} />)}
        </div>
    );
}

export default Listing