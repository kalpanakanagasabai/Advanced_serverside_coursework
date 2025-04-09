import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './LoginStyles.css'; // Import CSS for styling

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Username and password are required.');
      setLoading(false);
      return;
    }

    try {
      console.log('Logging in with:', { username, password });

      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      console.log('Response from backend:', response);

      if (response.status === 200) {
        setSuccess('Login successful! Redirecting...');

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        setUserId(userId);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Login failed. Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        {userId && <p className="user-id">User ID: {userId}</p>}

        <div className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;