import React, { useState, useEffect } from 'react';
import VenueList from './VenueList';

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues');
        if (response.ok) {
          const data = await response.json();
          setVenues(data || []); // Set venues to data directly, as data should be an array
        } else {
          console.error('Failed to fetch venues');
          setError('Failed to fetch venues');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError('Error fetching venues: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    console.log('Venues:', venues);
  }, [venues]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome to Holidaze!</h1>
      <p>Explore our amazing venues:</p>
      <VenueList venues={venues} />
    </div>
  );
};

export default Home;






