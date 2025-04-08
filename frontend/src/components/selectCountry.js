import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectCountry = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    onSelectCountry(e.target.value);
  };

  return (
    <div>
      <h2>Select a Country</h2>
      <select onChange={handleChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.cca3} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;
