import React, { useState } from 'react';
import useAuthStore from '../store/authStore'; // Assuming this is the correct path

const CreateBooking = ({ venueId, onSuccess }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  
  // Extracting accessToken using useAuthStore
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use accessToken from useAuthStore
    try {
      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          venueId,
          dateFrom,
          dateTo,
          guests,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const bookingData = await response.json();
      console.log('Booking successful:', bookingData);
      onSuccess(bookingData);
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} required />
      <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} required />
      <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" required />
      <button type="submit">Book Now</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateBooking;

