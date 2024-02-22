import React from 'react';
import CreateVenueForm from './CreateVenueForm';

const MyVenues = () => {
  const handleCreateVenue = (venueData) => {
    // Implement logic to create venue using the provided data
    console.log('Creating venue:', venueData);
  };

  return (
    <div>
      <h2>My Venues</h2>
      <CreateVenueForm onCreateVenue={handleCreateVenue} />
    </div>
  );
};

export default MyVenues;

