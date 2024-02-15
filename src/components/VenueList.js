import React from 'react';

const VenueList = ({ venues }) => {
  if (venues.length === 0) {
    return <div className="text-center">No venues available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Venues</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white shadow-md rounded-md mb-4">
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
              <p className="mb-2">{venue.description}</p>
              <p className="font-bold">Price: {venue.price}</p>
              <p className="font-bold">Max Guests: {venue.maxGuests}</p>
            </div>
            {venue.media.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-4">
                {venue.media.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;

















