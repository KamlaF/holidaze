import React from 'react';
import { Link } from 'react-router-dom';

const VenueList = ({ venues }) => {
  if (!venues || venues.length === 0) {
    return <div className="text-center">No venues available</div>;
  }

  // Filter venues with images
  const venuesWithImages = venues.filter(venue => venue.media && venue.media.length > 0);

  if (venuesWithImages.length === 0) {
    return <div className="text-center">No venues with images available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Venues</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {venuesWithImages.map((venue) => (
          <li key={venue.id} className="bg-white shadow-md rounded-md mb-4 overflow-hidden">
            <Link to={`/venues/${venue.id}`}>
              <img
                src={venue.media[0]}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                <p className="mb-2">{venue.description}</p>
                <p className="font-bold">Price: {venue.price}</p>
                <p className="font-bold">Max Guests: {venue.maxGuests}</p>
                <Link to={`/venues/${venue.id}`}>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Listing
                  </button>
                </Link>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
























