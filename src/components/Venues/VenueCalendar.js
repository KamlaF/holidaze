import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VenueCalendar = ({ venueId, bookings }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Utilize bookings prop to calculate unavailable dates
  const getUnavailableDates = () => {
    if (!bookings) return [];

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
    <DatePicker
      selected={selectedDate}
      onChange={setSelectedDate}
      filterDate={(date) => !isDateUnavailable(date)}
      inline
    />
  );
};

export default VenueCalendar;
