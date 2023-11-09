import React from 'react'
import ListingCard from './ListingCard'

function Listing({ listingsData }) {
    console.log(listingsData)
    return (
        <div className="w-full flex items-center justify-center p-4 space-y-4 bg-white shadow-md text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  max-w-mditems-center p-4 space-y-4 bg-white  shadow-md text-white max-w-sm"></div>
            <div className='listings'>
                {listingsData.map(listing => <ListingCard key={listing.id} listing={listing} />)}
            </div>
        </div>

    );
}

export default Listing