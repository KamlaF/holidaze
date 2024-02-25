import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthStore from "../../store/authStore"; // Corrected import path

const VenueCalendar = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetching accessToken from global state
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Using accessToken from global state
        const headers = {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        };
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings?_venue=true`,
          { headers }
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
