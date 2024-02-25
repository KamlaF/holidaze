import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "../../store/authStore"; // Update the path as necessary

const VenueCalendar = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const accessToken = useAuthStore((state) => state.accessToken); // Access accessToken from Zustand store

  useEffect(() => {
    const fetchBookings = async () => {
      if (!accessToken) {
        setError("No access token available.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Use accessToken from Zustand store
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
  }, [venueId, accessToken]);

  // Assuming bookings include dateFrom and dateTo, calculate "unavailable" dates
  const getUnavailableDates = () => {
    // This would be a more complex function in a real app, considering overlaps, etc.
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

  if (loading) return <div>Loading calendar...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      filterDate={(date) => !isDateUnavailable(date)}
      inline
    />
  );
};

export default VenueCalendar;
