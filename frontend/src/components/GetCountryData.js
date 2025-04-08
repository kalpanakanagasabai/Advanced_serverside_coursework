// import React, { useState } from 'react';
// import axios from 'axios';
// import SelectCountry from './selectCountry';

// const GetCountryData = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [countryData, setCountryData] = useState(null);
//   const [loading, setLoading] = useState(false); // Add loading state
//   const [error, setError] = useState(null); // Add error state

//   const fetchCountryData = async (countryName) => {
//     console.log("Fetching data for:", countryName); // Debugging line
//     setLoading(true); // Set loading to true before making the request
//     setError(null); // Reset any previous errors
//     try {
//       const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
//       setCountryData(response.data[0]);
//       console.log("Fetched data:", response.data); 
//     } catch (err) {
//       setError('Failed to fetch country data. Please try again later.');
//     } finally {
//       setLoading(false); // Set loading to false after the request completes
//     }
//   };

//   const handleCountrySelection = (countryName) => {
//     setSelectedCountry(countryName);
//     fetchCountryData(countryName);
//   };

//   console.log("Rendering GetCountryData component");

//   return (
//     <div>
//       <h1>Select a Country</h1>
//       <SelectCountry onSelectCountry={handleCountrySelection} />
      
//       {loading && <p>Loading...</p>} {/* Display loading message */}
      
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      
//       {selectedCountry && countryData && !loading && (
//         <div>
//           <h3>Country: {countryData.name.common}</h3>
//           <p>Capital: {countryData.capital}</p>
//           <p>Currency: {Object.values(countryData.currencies)[0].name}</p>
//           <p>Languages: {Object.values(countryData.languages).join(', ')}</p>
//           <img src={countryData.flags.svg} alt={`${countryData.name.common} Flag`} width="100" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetCountryData;


import React, { useState } from 'react';
import axios from 'axios';
import SelectCountry from './selectCountry';

const GetCountryData = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(''); // ✅ New: API key input

  const fetchCountryData = async (countryName) => {
    if (!apiKey) {
      setError('Please provide an API key.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/countries/info?name=${countryName}`, {
        headers: {
          'x-api-key': apiKey // ✅ API key sent in headers
        }
      });
      setCountryData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid API key. Please try again.');
      } else {
        setError('Failed to fetch country data. Please try again later.');
      }
      setCountryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelection = (countryName) => {
    setSelectedCountry(countryName);
    fetchCountryData(countryName);
  };

  return (
    <div>
      <h1>Select a Country</h1>

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

      <br /><br />

      <SelectCountry onSelectCountry={handleCountrySelection} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedCountry && countryData && !loading && (
        <div>
          <h3>Country: {countryData.name}</h3>
          <p><strong>Capital:</strong> {countryData.capital}</p>
          <p><strong>Currency:</strong> {countryData.currency}</p>
          <p><strong>Languages:</strong> {countryData.languages}</p>
          <img src={countryData.flag} alt={`${countryData.name} Flag`} width="100" />
        </div>
      )}
    </div>
  );
};

export default GetCountryData;
