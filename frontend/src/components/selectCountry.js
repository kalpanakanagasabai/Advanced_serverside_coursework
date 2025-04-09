import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SelectCountryStyles.css'; 

const SelectCountry = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries', error);
        setError('Failed to load countries.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const countryName = e.target.innerText;
    setSelectedCountry(countryName); // Update selected country
    onSelectCountry(countryName); // Trigger the callback to parent
    setDropdownVisible(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="select-country-container">
      <div className="select-country-card">
        <h2 className="title">Select Your Country</h2>
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <div className="dropdown-container">
            <div className="dropdown" onClick={toggleDropdown}>
              <input
                type="text"
                className="search-input"
                placeholder="Search for a country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                onFocus={toggleDropdown} 
              />
              <div className="arrow"></div>
            </div>

            {dropdownVisible && (
              <div className="dropdown-list">
                {countries
                  .filter((country) =>
                    country.name.common.toLowerCase().includes(selectedCountry.toLowerCase())
                  )
                  .map((country) => (
                    <div
                      key={country.cca3}
                      className="dropdown-item"
                      onClick={handleChange}
                    >
                      {country.name.common}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SelectCountry;
