import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

const FetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const { accessToken, userName } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    userName: state.userName,
  }));

  useEffect(() => {
    const fetchVenues = async () => {
      if (!accessToken || !userName) return;

      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/venues`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
      }
    };

    fetchVenues();
  }, [userName, accessToken]);

  // Helper function to render venue meta data
  const renderMeta = (meta) => {
    return Object.entries(meta).map(([key, value]) => (
      <span key={key} className={`inline-block bg-${value ? 'green' : 'red'}-200 text-${value ? 'green' : 'red'}-700 text-xs font-bold mr-2 px-2.5 py-0.5 rounded`}>
        {key}: {value ? 'Yes' : 'No'}
      </span>
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Venues</h3>
      {venues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white shadow rounded-lg p-4">
              <img src={venue.media[0]} alt={venue.name} className="w-full h-48 object-cover rounded-md" />
              <div className="p-2">
                <h4 className="text-lg font-semibold">{venue.name}</h4>
                <p className="text-sm">{venue.description}</p>
                <div className="py-2">
                  {renderMeta(venue.meta)}
                </div>
                <p className="text-sm">Price: ${venue.price} / night</p>
                <p className="text-sm">Max Guests: {venue.maxGuests}</p>
                <p className="text-sm">Rating: {venue.rating}</p>
                <div className="text-xs text-gray-500">Last updated: {new Date(venue.updated).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No venues found.</p>
      )}
    </div>
  );
};

export default FetchVenues;





