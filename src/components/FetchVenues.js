import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom'; 

const FetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const { accessToken, userName } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    userName: state.userName,
  }));
  const navigate = useNavigate(); 

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

  const handleUpdateClick = (venueId) => {
    navigate(`/venues/update/${venueId}`); 
  };

  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-semibold py-4">Active venues</h3>
      {venues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white shadow rounded-lg p-4">
              <img src={venue.media[0]} alt={venue.name} className="w-full h-48 object-cover rounded-md" />
              <div className="p-2">
                <h4 className="text-lg font-semibold">{venue.name}</h4>
                <p className="text-sm">{venue.description}</p>
                <p className="text-sm">Price: ${venue.price} / night</p>
                <p className="text-sm">Max Guests: {venue.maxGuests}</p>

                {/* Display booking details */}
                <h5 className="text-md font-semibold mt-2">Bookings:</h5>
                {venue.bookings && venue.bookings.length > 0 ? (
                  <ul>
                    {venue.bookings.map((booking) => (
                      <li key={booking.id}>
                        <p>Date From: {booking.dateFrom}</p>
                        <p>Date To: {booking.dateTo}</p>
                        <p>Guests: {booking.guests}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No bookings found for this venue.</p>
                )}

                <button
                  onClick={() => handleUpdateClick(venue.id)}
                  className="mt-4 bg-background hover:bg-accent-2 text-white font-bold py-2 px-4 rounded"
                >
                  Update Venue
                </button>
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








