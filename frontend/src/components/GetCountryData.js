import React, { useState } from 'react';
import axios from 'axios';
import SelectCountry from './SelectCountry'; // Make sure this component is properly implemented

const GetCountryData = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [apiKey, setApiKey] = useState(''); // Add state for the API key
  const [apiKeyValid, setApiKeyValid] = useState(true); // Add state for API key validity

  const fetchCountryData = async (countryName) => {
    if (!apiKey) {
      setError('Please provide an API key.');
      return;
    }

    console.log("Fetching data for:", countryName); // Debugging line
    setLoading(true); // Set loading to true before making the request
    setError(null); // Reset any previous errors
    setApiKeyValid(true);

    try {
      // Fetching country data from the REST API with the API key in the header
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`, {
        headers: {
          'x-api-key': apiKey, // Include the API key in the request header
        },
      });
      setCountryData(response.data[0]);
      console.log("Fetched data:", response.data); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid API key. Please try again.');
        setApiKeyValid(false);
      } else {
        setError('Failed to fetch country data. Please try again later.');
      }
      setCountryData(null);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const handleCountrySelection = (countryName) => {
    setSelectedCountry(countryName);
    fetchCountryData(countryName);
  };

  console.log("Rendering GetCountryData component");

  return (
    <div>
      <h1>Select a Country</h1>
      
      {/* API Key Input */}
      <label>
        Enter API Key:
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          style={{ marginLeft: 10, width: 300 }}
        />
      </label>
      
      {/* API Key Error */}
      {!apiKeyValid && <p style={{ color: 'red' }}>The API key you entered is invalid. Please try again.</p>}

      <br /><br />

      {/* Country Selection Component */}
      <SelectCountry onSelectCountry={handleCountrySelection} />
      
      {/* Loading and Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Display Country Data */}
      {selectedCountry && countryData && !loading && (
        <div>
          <h3>Country: {countryData.name.common}</h3>
          <p><strong>Capital:</strong> {countryData.capital}</p>
          <p><strong>Currency:</strong> {Object.values(countryData.currencies)[0].name}</p>
          <p><strong>Languages:</strong> {Object.values(countryData.languages).join(', ')}</p>
          <img src={countryData.flags.svg} alt={`${countryData.name.common} Flag`} width="100" />
        </div>
      )}
    </div>
  );
};

export default GetCountryData;


