import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';

const CreateVenueForm = () => {
    const [venueData, setVenueData] = useState({
        name: '',
        description: '',
        media: [], // Assuming this is meant to hold URLs
        price: '',
        maxGuests: '',
        rating: 0,
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: ''
           
        }
    });

    const accessToken = useAuthStore(state => state.accessToken);

   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'media') {
        // Validate media URL
        if (isValidUrl(value)) {
            setVenueData(prevState => ({ ...prevState, media: [value] }));
        }
    } else if (name.startsWith('location.')) {
        const locationField = name.split('.')[1];
        // Convert latitude and longitude to numbers
        if (locationField === 'lat' || locationField === 'lng') {
            setVenueData(prevState => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    [locationField]: parseFloat(value)
                }
            }));
        } else {
            setVenueData(prevState => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    [locationField]: value
                }
            }));
        }
    } else {
        if (name in venueData) {
            setVenueData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
        }
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            ...venueData,
            price: parseFloat(venueData.price),
            maxGuests: parseInt(venueData.maxGuests, 10),
            rating: parseInt(venueData.rating, 10)
        };

        console.log('Submitting form data:', formData);

        try {
            const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Venue created successfully:', responseData);
            // Clear media URL after successful submission
            setVenueData(prevState => ({ ...prevState, media: [] }));
            // Implement success feedback here (e.g., redirect, toast notification)
        } catch (error) {
            console.error('Error creating venue:', error);
            // Implement error handling feedback here (e.g., error message)
        }
    };

    // Function to validate URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            {/* Name input */}
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={venueData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Description input */}
            <div className="flex flex-col">
                <label htmlFor="description" className="mb-2 font-semibold">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={venueData.description}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Price input */}
            <div className="flex flex-col">
                <label htmlFor="price" className="mb-2 font-semibold">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={venueData.price}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Max Guests input */}
            <div className="flex flex-col">
                <label htmlFor="maxGuests" className="mb-2 font-semibold">Max Guests:</label>
                <input
                    type="number"
                    id="maxGuests"
                    name="maxGuests"
                    value={venueData.maxGuests}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Location inputs */}
            <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 font-semibold">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="location.address"
                    value={venueData.location.address}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="city" className="mb-2 font-semibold">City:</label>
                <input
                    type="text"
                    id="city"
                    name="location.city"
                    value={venueData.location.city}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="zip" className="mb-2 font-semibold">ZIP Code:</label>
                <input
                    type="text"
                    id="zip"
                    name="location.zip"
                    value={venueData.location.zip}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="country" className="mb-2 font-semibold">Country:</label>
                <input
                    type="text"
                    id="country"
                    name="location.country"
                    value={venueData.location.country}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="continent" className="mb-2 font-semibold">Continent:</label>
                <input
                    type="text"
                    id="continent"
                    name="location.continent"
                    value={venueData.location.continent}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
         

            {/* Media URL input */}
            <div className="flex flex-col">
                <label htmlFor="media" className="mb-2 font-semibold">Media URL:</label>
                <input
                    type="text"
                    id="media"
                    name="media"
                    placeholder="https://example.com/image.jpg"
                    value={venueData.media[0] || ''}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Submit button */}
            <button type="submit" className="w-full px-4 py-2 bg-background hover:bg-accent-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create Venue
            </button>
        </form>
    );
};

export default CreateVenueForm;














 





