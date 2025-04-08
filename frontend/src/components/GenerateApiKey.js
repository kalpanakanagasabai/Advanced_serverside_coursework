// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const ApiKeyManagement = () => {
// //   const [apiKey, setApiKey] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [usageData, setUsageData] = useState(null);
// //   const [isGenerating, setIsGenerating] = useState(false);

// //   const generateApiKey = async () => {
// //     try {
// //       setIsGenerating(true);
// //       // Assuming the token is stored in localStorage after login
// //       const authToken = localStorage.getItem('authToken');

// //       // Include the authToken in the request headers for user identification
// //       const response = await axios.post('http://localhost:5000/auth/generate-api-key', {}, {
// //         headers: { 'Authorization': `Bearer ${authToken}` },
// //       });

// //       setApiKey(response.data.apiKey);
// //       setMessage('API Key generated successfully.');
// //     } catch (error) {
// //       console.error('Error generating API Key:', error);
// //       if (error.response) {
// //         setMessage(`Error: ${error.response.data.message}`);
// //       } else {
// //         setMessage('Error generating API Key.');
// //       }
// //     } finally {
// //       setIsGenerating(false);
// //     }
// //   };

// //   const checkUsage = async () => {
// //     if (!apiKey) {
// //       setMessage('Please generate an API key first.');
// //       return;
// //     }
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/usage-report', {
// //         headers: { 'api-key': apiKey },
// //       });
// //       setUsageData(response.data);
// //     } catch (error) {
// //       console.error('Error fetching API usage data:', error);
// //       setMessage('Error fetching API usage data.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>API Key Management</h2>
// //       {!apiKey ? (
// //         <button onClick={generateApiKey} disabled={isGenerating}>
// //           {isGenerating ? 'Generating...' : 'Generate API Key'}
// //         </button>
// //       ) : (
// //         <div>
// //           <p>API Key: {apiKey}</p>
// //           <button onClick={checkUsage}>Check API Usage</button>
// //         </div>
// //       )}
// //       {message && <p>{message}</p>}
// //       {usageData && (
// //         <div>
// //           <h3>API Key Usage</h3>
// //           <p>Usage Count: {usageData.usageCount}</p>
// //           <p>Last Used: {usageData.lastUsed}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ApiKeyManagement;

// import React, { useState } from 'react';
// import api from '../utils/api';

// const ApiKeyManager = () => {
//   const [apiKey, setApiKey] = useState('');

//   const generateKey = async () => {
//     const res = await api.post('/auth/generate-api-key');
//     localStorage.setItem('apiKey', res.data.apiKey);
//     setApiKey(res.data.apiKey);
//   };

//   return (
//     <div>
//       <h2>API Key Manager</h2>
//       <button onClick={generateKey}>Generate API Key</button>
//       {apiKey && <p>Your API Key: <strong>{apiKey}</strong></p>}
//     </div>
//   );
// };

// export default ApiKeyManager;


import React, { useState } from 'react';
import axios from 'axios';

const GenerateApiKey = () => {
  const [userId, setUserId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleGenerateApiKey = async () => {
    try {
      // Assuming the user is logged in and has a JWT token stored in localStorage or a cookie
      const token = localStorage.getItem('token'); // Get JWT token from localStorage

      if (!token) {
        setError('You need to log in first.');
        return;
      }

      // Send request to generate API key
      const response = await axios.post(
        'http://localhost:5000/api/generate-api-key',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      setApiKey(response.data.apiKey);
      setError('');
    } catch (error) {
      console.error('Error generating API key:', error);
      setError('Failed to generate API key. Please try again.');
    }
  };

  return (
    <div>
      <h1>Generate API Key</h1>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleGenerateApiKey}>Generate API Key</button>
      </div>

      {apiKey && (
        <div>
          <h2>Generated API Key:</h2>
          <p>{apiKey}</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateApiKey;
