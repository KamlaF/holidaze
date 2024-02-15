import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVenue(data);
        } else {
          setError('Failed to fetch venue details');
        }
      } catch (error) {
        setError('Error fetching venue details: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{venue.name}</h2>
      <div className="flex justify-center mb-4">
        {venue.media && venue.media.length > 0 && (
          <img src={venue.media[0]} alt={venue.name} className="max-w-full h-auto" />
        )}
      </div>
      <p className="mb-4">{venue.description}</p>
      <p className="font-bold">Price: {venue.price}</p>
      <p className="font-bold">Max Guests: {venue.maxGuests}</p>
      <p className="font-bold">Rating: {venue.rating}</p>
      <div className="mt-4">
        <h3 className="font-bold">Location</h3>
        <p>{venue.location.address}, {venue.location.city}, {venue.location.zip}</p>
        <p>{venue.location.country}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-bold">Amenities</h3>
        <ul>
          <li>Wifi: {venue.meta.wifi ? 'Available' : 'Not available'}</li>
          <li>Parking: {venue.meta.parking ? 'Available' : 'Not available'}</li>
          <li>Breakfast: {venue.meta.breakfast ? 'Available' : 'Not available'}</li>
          <li>Pets: {venue.meta.pets ? 'Allowed' : 'Not allowed'}</li>
        </ul>
      </div>
    </div>
  );
};

export default VenueDetail;



