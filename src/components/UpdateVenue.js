import React, { useState } from 'react';
import useAuthStore from '../store/authStore';

const UpdateVenue = ({ venueId, initialVenueData, onUpdate }) => {
  const [venueData, setVenueData] = useState(initialVenueData);
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.noroff.dev/holidaze/venues/${venueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        throw new Error('Failed to update venue');
      }

      onUpdate(); // Callback to refresh the venue list or data
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields for venue data */}
      {/* Example for name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={venueData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Add more fields for description, media, price, maxGuests, rating, meta, and location */}
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Update Venue
      </button>
    </form>
  );
};

export default UpdateVenue;
