import React, { useState, useRef, useEffect } from 'react';

const IDSearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls visibility of the search input
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search term entered by the user
  const ref = useRef();

  const handleToggle = () => setIsOpen(!isOpen); // Toggles visibility of the search input

  const handleSearch = () => {
    console.log("Searching for ID:", searchTerm); // For now, logs the search term
    setIsOpen(false); // Optionally close after search
  };

  // Close the search popup if clicked outside of the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="id-search-container" ref={ref}>
      <button onClick={handleToggle} className="id-button">
        ID
      </button>

      {isOpen && (
        <div className="search-panel">
          <input
            type="text"
            placeholder="Enter ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            <i className="fa fa-search"></i> {/* FontAwesome search icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default IDSearchComponent;
