import React from "react";
import CreateVenueForm from "./CreateVenueForm";
import FetchVenues from "./FetchVenues";
import { Helmet } from "react-helmet";

const MyVenues = () => {
  const handleCreateVenue = (venueData) => {
    console.log("Creating venue:", venueData);
  };

  const profileId = "your_profile_id_here";

  return (
    <div>
      <Helmet>
        <title>Welcome to Holidaze! - Discover Amazing Venues</title>
        <meta
          name="description"
          content="Explore and book your next adventure with Holidaze. Discover amazing venues tailored to your needs."
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
