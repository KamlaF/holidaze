import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { isAuthenticated, accessToken, userName } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    accessToken: state.accessToken,
    userName: state.userName // Accessing userName directly
  }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setError('You must be logged in to view bookings.');
      setLoading(false);
      return;
    }

    if (!userName) {
      setError('Profile name is required to fetch bookings.');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/bookings`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, userName, accessToken]); // Dependency on userName and accessToken

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Venue ID: {booking.venueId}, From: {booking.dateFrom}, To: {booking.dateTo}, Guests: {booking.guests}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;





