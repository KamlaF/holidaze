import React from 'react';
import CreateVenueForm from './CreateVenueForm';
import FetchVenues from './FetchVenues'; // Import the new component

const MyVenues = () => {
  const handleCreateVenue = (venueData) => {
    // Implement logic to create venue using the provided data
    console.log('Creating venue:', venueData);
  };

  // Example profile ID. Replace it with actual logic to obtain the current profile's ID.
  const profileId = 'your_profile_id_here';

  return (
<div>
  <h1 className="text-center font-headline text-3xl mb-6">My Venues</h1>
  <div className="flex">
    <h3 className="text-3xl font-semibold py-4">Create a new venue</h3>
    
  </div>
  <CreateVenueForm onCreateVenue={handleCreateVenue} />
  <FetchVenues profileId={profileId} />
</div>

  );
};

export default MyVenues;


