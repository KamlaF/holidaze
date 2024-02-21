import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import VenueCalendar from './VenueCalendar';
import CreateBooking from './CreateBooking';

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, userRole } = useAuthStore(); // Destructuring directly from useAuthStore hook
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        if (!response.ok) throw new Error('Failed to fetch venue details');
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      navigate('/my-bookings'); // Use navigate for redirection after booking success
    }, 2000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">{venue.name}</h2>
      <div className="mb-4">
        <img src={venue.media && venue.media.length > 0 ? venue.media[0] : ''} alt={venue.name} className="max-w-full h-auto" />
      </div>
      <p className="mb-4">{venue.description}</p>
      <div className="mb-4">
        <p className="font-bold">Price: {venue.price} per night</p>
        <p className="font-bold">Max Guests: {venue.maxGuests}</p>
        <p className="font-bold">Rating: {venue.rating}/5</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Location</h3>
        <p>{`${venue.location.address}, ${venue.location.city}, ${venue.location.zip}`}</p>
        <p>{venue.location.country}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Amenities</h3>
        <ul>
          <li>Wifi: {venue.meta.wifi ? 'Available' : 'Not Available'}</li>
          <li>Parking: {venue.meta.parking ? 'Available' : 'Not Available'}</li>
          <li>Breakfast: {venue.meta.breakfast ? 'Included' : 'Not Included'}</li>
          <li>Pets: {venue.meta.pets ? 'Allowed' : 'Not Allowed'}</li>
        </ul>
      </div>

      {isAuthenticated && userRole !== 'manager' && (
        <>
          {bookingSuccess ? (
            <div className="bg-green-200 text-green-800 p-2 rounded mt-4">Booking successful! Redirecting...</div>
          ) : (
            <CreateBooking
              venueId={id}
              onSuccess={handleBookingSuccess}
            />
          )}
        </>
      )}

      <VenueCalendar venueId={id} />
    </div>
  );
};

export default VenueDetail;



















