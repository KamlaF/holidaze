import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import VenueList from "../Venues/VenueList";
import VenueSearch from "../Venues/VenueSearch";
import frontcover from "../../Images/frontcover.png";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues"
        );
        if (response.ok) {
          const data = await response.json();
          setVenues(data || []);
          setFilteredVenues(data || []);
        } else {
          console.error("Failed to fetch venues");
          setError("Failed to fetch venues");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Error fetching venues: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-text1">Error: {error}</div>;
  }

  return (
    <div className="relative">
      <Helmet>
        <title>Welcome to Holidaze! - Discover Amazing Venues</title>
        <meta
          name="description"
          content="Explore and book your next adventure with Holidaze. Discover amazing venues tailored to your needs."
        />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingTop: "40%" }}
      >
        {" "}
        {/* Increase paddingTop to make the image container higher */}
        <img
          src={frontcover}
          alt="Holidaze front cover"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        <h1
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-text-1 font-bold text-5xl"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Welcome to Holidaze!
        </h1>
      </div>

      <div className="mt-10 p-4">
        <VenueSearch onSearch={handleSearch} />
        <p className="font-albert text-text1 mt-4">
          Explore our amazing venues:
        </p>
        <div className="overflow-auto">
          <VenueList venues={filteredVenues} />
        </div>
      </div>
    </div>
  );
};

export default Home;
