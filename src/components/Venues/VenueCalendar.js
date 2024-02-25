import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "../../store/authStore"; // Update the path as necessary

const VenueCalendar = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false); // Assume not loading by default
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isAuthenticated, accessToken } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }

        const allBookings = await response.json();
        const venueBookings = allBookings.filter(
          (booking) => booking.venue.id === venueId
        );
        setBookings(venueBookings);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venueId, isAuthenticated, accessToken]);

  const getUnavailableDates = () => {
    const unavailableDates = bookings.flatMap((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      const dates = [];
      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        dates.push(new Date(dt));
      }
      return dates;
    });
    return unavailableDates;
  };

  const isDateUnavailable = (date) => {
    const unavailableDates = getUnavailableDates();
    return unavailableDates.some(
      (unavailableDate) =>
        date.getDate() === unavailableDate.getDate() &&
        date.getMonth() === unavailableDate.getMonth() &&
        date.getFullYear() === unavailableDate.getFullYear()
    );
  };

  return (
    <>
      {loading && <div>Loading calendar...</div>}
      {error && <div>{error}</div>}
      {!isAuthenticated && (
        <div>Please log in to see detailed availability.</div>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        filterDate={
          isAuthenticated ? (date) => !isDateUnavailable(date) : undefined
        }
        inline
      />
    </>
  );
};

export default VenueCalendar;
