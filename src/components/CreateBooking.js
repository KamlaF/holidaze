import React, { useState } from 'react';

const CreateBooking = ({ venueId, onSuccess }) => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming accessToken is stored in localStorage
    const accessToken = localStorage.getItem('accessToken');
    
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

      const bookingData = await response.json(); // Get the JSON response body
      console.log('Booking successful:', bookingData); // Log the successful booking data

      onSuccess(bookingData); // Callback function to signal success, now passing the booking data
    } catch (error) {
      console.error('Error creating booking:', error); // Log any errors
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

