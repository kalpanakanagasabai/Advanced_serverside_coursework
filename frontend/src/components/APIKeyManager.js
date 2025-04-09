// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // API helper functions
// const api = axios.create({
//   baseURL: 'http://your-backend-url/api',  // Update with your backend URL
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
//   }
// });

// const generateApiKey = async () => {
//   try {
//     const response = await api.post('/generate-api-key');
//     return response.data.apiKey;
//   } catch (error) {
//     console.error("Error generating API key", error);
//     throw error;
//   }
// };

// const getApiKeys = async () => {
//   try {
//     const response = await api.get('/get-api-keys');
//     return response.data.apiKeys;
//   } catch (error) {
//     console.error("Error fetching API keys", error);
//     throw error;
//   }
// };

// const revokeApiKey = async (apiKey) => {
//   try {
//     await api.post('/revoke-api-key', { apiKey });
//   } catch (error) {
//     console.error("Error revoking API key", error);
//     throw error;
//   }
// };

// // Main component to manage API keys
// const ApiKeyManager = () => {
//   const [apiKey, setApiKey] = useState(null);
//   const [apiKeys, setApiKeys] = useState([]);
  
//   // Fetch API keys on component mount
//   useEffect(() => {
//     const fetchApiKeys = async () => {
//       try {
//         const keys = await getApiKeys();
//         setApiKeys(keys);
//       } catch (error) {
//         alert('Failed to load API keys');
//       }
//     };

//     fetchApiKeys();
//   }, []);

//   const handleGenerateApiKey = async () => {
//     try {
//       const newApiKey = await generateApiKey();
//       setApiKey(newApiKey);
//       alert('New API Key generated: ' + newApiKey);
//       // Re-fetch the API keys after generating a new one
//       const keys = await getApiKeys();
//       setApiKeys(keys);
//     } catch (error) {
//       alert('Failed to generate API key');
//     }
//   };

//   const handleRevoke = async (apiKeyToRevoke) => {
//     try {
//       await revokeApiKey(apiKeyToRevoke);
//       setApiKeys(apiKeys.filter((key) => key.apiKey !== apiKeyToRevoke));
//       alert('API Key revoked successfully');
//     } catch (error) {
//       alert('Failed to revoke API key');
//     }
//   };

//   const handleDelete = (apiKeyToDelete) => {
//     alert(`Delete action on key: ${apiKeyToDelete}`);
//     // Add delete logic here if necessary
//   };

//   const handleView = (apiKeyToView) => {
//     alert(`View action on key: ${apiKeyToView}`);
//     // Add view logic here if necessary
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>API Key Management</h1>
//       <button 
//         onClick={handleGenerateApiKey} 
//         style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
//       >
//         <i className="fa fa-key" style={{ marginRight: '8px' }}></i> Generate New API Key
//       </button>
//       {apiKey && <p style={{ marginTop: '10px' }}>New API Key: {apiKey}</p>}

//       <h2>Your API Keys</h2>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>API Key</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Last Used</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Usage Count</th>
//             <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {apiKeys.map((key) => (
//             <tr key={key.apiKey}>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{key.apiKey}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{key.lastUsed || 'N/A'}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>{key.usageCount}</td>
//               <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                 <button 
//                   onClick={() => handleRevoke(key.apiKey)} 
//                   style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}
//                 >
//                   <i className="fa fa-ban"></i> Revoke
//                 </button>
//                 <button 
//                   onClick={() => handleDelete(key.apiKey)} 
//                   style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}
//                 >
//                   <i className="fa fa-trash"></i> Delete
//                 </button>
//                 <button 
//                   onClick={() => handleView(key.apiKey)} 
//                   style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
//                 >
//                   <i className="fa fa-eye"></i> View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApiKeyManager;
