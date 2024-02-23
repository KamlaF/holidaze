import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const UpdateVenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useAuthStore(state => state.accessToken);
  
  const [venueDetails, setVenueDetails] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    rating: '',
  });

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch venue details');
        }
        const data = await response.json();
        setVenueDetails(data);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    fetchVenueDetails();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(venueDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update venue');
      }

      alert('Venue updated successfully');
      navigate('/venues');
    } catch (error) {
      console.error('Error updating venue:', error);
      alert('Failed to update venue');
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this venue?');
    if (confirmation) {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete venue');
        }

        alert('Venue deleted successfully');
        navigate('/venues');
      } catch (error) {
        console.error('Error deleting venue:', error);
        alert('Failed to delete venue');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold leading-tight text-gray-800">Update Venue</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" value={venueDetails.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" value={venueDetails.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" id="price" value={venueDetails.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">Max Guests</label>
            <input type="number" name="maxGuests" id="maxGuests" value={venueDetails.maxGuests} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
            <input type="number" name="rating" id="rating" value={venueDetails.rating} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Venue
          </button>
          <button type="button" onClick={handleDelete} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete Venue
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVenueForm;




