import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import VenueCalendar from "./VenueCalendar";
import CreateBooking from "../Bookings/CreateBooking";
import { Helmet } from "react-helmet";

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, userRole } = useAuthStore(); // Destructuring directly from useAuthStore hook
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch venue details");
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
      navigate("/my-bookings"); // Use navigate for redirection after booking success
    }, 2000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Holidaze - Discover Amazing Venues</title>
        <meta
          name="description"
          content="Detail page for venues you can book at holidazes"
        />
      </Helmet>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
        {venue.name}
      </h2>
      <div className="mb-6">
        <img
          src={venue.media && venue.media.length > 0 ? venue.media[0] : ""}
          alt={venue.name}
          className="w-full h-auto rounded-lg shadow"
        />
      </div>
      <p className="mb-6 text-gray-700">{venue.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <p className="font-bold">Price: {venue.price} per night</p>
        <p className="font-bold">Max Guests: {venue.maxGuests}</p>
        <p className="font-bold">Rating: {venue.rating}/5</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2">Location</h3>
        <p className="text-gray-700">{`${venue.location.address}, ${venue.location.city}, ${venue.location.zip}`}</p>
        <p className="text-gray-700">{venue.location.country}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2">Amenities</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Wifi: {venue.meta.wifi ? "Available" : "Not Available"}</li>
          <li>Parking: {venue.meta.parking ? "Available" : "Not Available"}</li>
          <li>
            Breakfast: {venue.meta.breakfast ? "Included" : "Not Included"}
          </li>
          <li>Pets: {venue.meta.pets ? "Allowed" : "Not Allowed"}</li>
        </ul>
      </div>

      <VenueCalendar venueId={id} bookings={venue.bookings} />

      {isAuthenticated && userRole !== "manager" && (
        <>
          {bookingSuccess ? (
            <div className="bg-green-200 text-green-800 p-4 rounded mt-4 text-center">
              Booking successful! Redirecting...
            </div>
          ) : (
            <CreateBooking venueId={id} onSuccess={handleBookingSuccess} />
          )}
        </>
      )}
    </div>
  );
};

export default VenueDetail;
