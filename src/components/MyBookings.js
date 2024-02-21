import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { isAuthenticated, accessToken, userName } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    accessToken: state.accessToken,
    userName: state.userName,
  }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      setError('You must be logged in to view bookings.');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const bookingsResponse = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/bookings`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, userName, accessToken]);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-4">Upcoming Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.length ? (
          bookings.map(({ id, dateFrom, dateTo, guests }) => (
            <div key={id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
              <div className="p-4">
                <h3 className="text-xl font-bold">Booking ID: {id}</h3>
                <p><strong>Booking Dates:</strong> {new Date(dateFrom).toLocaleDateString()} to {new Date(dateTo).toLocaleDateString()}</p>
                <p><strong>Guests:</strong> {guests}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;











