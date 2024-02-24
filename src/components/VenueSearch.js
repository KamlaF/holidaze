import React, { useState } from 'react';

const VenueSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search our venues"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="border border-accent-2 rounded-md py-2 px-4 w-full"

      />
    </div>
  );
};

export default VenueSearch;
