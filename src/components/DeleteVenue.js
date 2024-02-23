import React from 'react';
import useAuthStore from '../store/authStore';

const DeleteVenue = ({ venueId, onDelete }) => {
  const { accessToken } = useAuthStore((state) => ({
    accessToken: state.accessToken,
  }));

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://api.noroff.dev/holidaze/venues/${venueId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete venue');
      }

      onDelete(); // Callback to refresh the venue list or handle post-deletion logic
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      Delete Venue
    </button>
  );
};

export default DeleteVenue;
