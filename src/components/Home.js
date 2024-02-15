import React, { useState, useEffect } from 'react';
import VenueList from './VenueList'; // Import the VenueList component

const Home = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // Fetch the list of venues from your API
    const fetchVenues = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');
        if (response.ok) {
          const data = await response.json();
          setVenues(data);
        } else {
          console.error('Failed to fetch venues');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div>
      <h1>Welcome to Holidaze!</h1>
      <p>Explore our amazing venues:</p>
      <VenueList venues={venues} />
    </div>
  );
};

export default Home;
