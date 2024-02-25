import React from 'react';
import CreateVenueForm from './CreateVenueForm';
import FetchVenues from './FetchVenues'; 

const MyVenues = () => {
  const handleCreateVenue = (venueData) => {

    console.log('Creating venue:', venueData);
  };

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


