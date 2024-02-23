import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VenueList = ({ venues }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  if (!venues || venues.length === 0) {
    return <div className="text-center">No venues available</div>;
  }

  // Sort by creation date in descending order and filter venues with images
  const sortedVenuesWithImages = venues
    .filter(venue => venue.media && venue.media.length > 0)
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  if (sortedVenuesWithImages.length === 0) {
    return <div className="text-center">No venues with images available</div>;
  }

  // Calculate pagination details
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedVenuesWithImages.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedVenuesWithImages.length / itemsPerPage);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Venues</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentItems.map((venue) => (
          <li key={venue.id} className="bg-white shadow-md rounded-md mb-4 overflow-hidden">
            <Link to={`/venues/${venue.id}`}>
              <img
                src={venue.media[0]}
                alt={venue.name}
                className="w-full h-40 object-cover"
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
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VenueList;


























