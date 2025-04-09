import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApiKeyManagerStyles.css'; // Import CSS for styling

const ApiKeyManager = () => {
  const [userId, setUserId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You need to log in first.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/api-keys', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApiKeys(response.data.apiKeys);
      } catch (err) {
        console.error('Error fetching API keys:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const handleGenerateApiKey = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in first.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/generate-api-key',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApiKey(response.data.apiKey);
      setError('');
      setStatusMessage('API Key generated successfully.');
      setApiKeys([...apiKeys, { key: response.data.apiKey, createdAt: new Date().toISOString(), status: 'Active' }]);
      setTimeout(() => setStatusMessage(''), 3000); // Clear status after 3 seconds
    } catch (err) {
      console.error('Error generating API key:', err);
      setError('Failed to generate API key. Please try again.');
      setStatusMessage('');
    }
  };

  return (
    <div className="api-key-manager-container">
      <div className="api-key-manager-card">
        <h2>API Key Management</h2>

        <div className="generate-key-section">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={handleGenerateApiKey}>
            Generate API Key
          </button>
        </div>

        {apiKey && (
          <div className="new-api-key">
            <h3>New API Key:</h3>
            <code className="api-key-code">{apiKey}</code>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
        {statusMessage && <p className="success-message">{statusMessage}</p>}

        <h3>Your API Keys</h3>

        {loading ? (
          <p>Loading API keys...</p>
        ) : apiKeys.length > 0 ? (
          <div className="api-keys-table-container">
            <table className="api-keys-table">
              <thead>
                <tr>
                  <th>API Key</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.key}>
                    <td><code className="api-key-code">{key.key}</code></td>
                    <td>{new Date(key.createdAt).toLocaleString()}</td>
                    <td><span className="status-active">{key.status || 'Active'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No API keys found.</p>
        )}
      </div>
    </div>
  );
};

export default ApiKeyManager;