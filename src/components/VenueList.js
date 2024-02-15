import React, { useState, useEffect } from 'react';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // You can include any other necessary request body data here
        });

        if (response.ok) {
          const data = await response.json();
          setVenues(data.data); // Assuming data is an array of venue objects
        } else {
          setError('Failed to fetch venues: ' + response.statusText);
        }
      } catch (error) {
        setError('Error fetching venues: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Venues</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id} className="bg-white shadow-md p-4 rounded-md mb-4">
            <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
            <p className="mb-2">{venue.description}</p>
            <p className="font-bold">Price: {venue.price}</p>
            {/* You can include more venue details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;











