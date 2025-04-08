// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';  // For programmatic navigation

// // const LoginComponent = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false); // For loading state
// //   const [success, setSuccess] = useState(''); // For success message

// //   const navigate = useNavigate();  // For programmatic navigation after success

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true); // Start loading animation or state
// //     setError(''); // Reset error message
// //     setSuccess(''); // Reset success message

// //     // Input validation
// //     if (!username || !password) {
// //       setError('Username and password are required.');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       console.log('Logging in with:', { username, password }); // Log the data sent to backend

// //       // Send POST request to the backend login route
// //       const response = await axios.post('http://localhost:5000/auth/login', {
// //         username,
// //         password,
// //       });

// //       console.log('Response from backend:', response); // Log the response from backend

// //       if (response.status === 200) {
// //         setSuccess('Login successful! Redirecting...');
// //         // Redirect to another page after successful login (e.g., Dashboard)
// //         setTimeout(() => {
// //           navigate('/dashboard');  // Replace with the actual route after login
// //         }, 2000);
// //       } else {
// //         setError('Login failed. Invalid username or password.');
// //       }
// //     } catch (err) {
// //       console.error('Login error:', err);
// //       setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
// //     } finally {
// //       setLoading(false); // Stop loading state
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit" disabled={loading}>
// //           {loading ? 'Logging in...' : 'Login'}
// //         </button>
// //       </form>

// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       {success && <p style={{ color: 'green' }}>{success}</p>}
// //     </div>
// //   );
// // };

// // export default LoginComponent;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // For programmatic navigation
// import { jwtDecode } from 'jwt-decode';  // Corrected import

// const LoginComponent = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // For loading state
//   const [success, setSuccess] = useState(''); // For success message

//   const navigate = useNavigate();  // For programmatic navigation after success

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading animation or state
//     setError(''); // Reset error message
//     setSuccess(''); // Reset success message

//     // Input validation
//     if (!username || !password) {
//       setError('Username and password are required.');
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log('Logging in with:', { username, password }); // Log the data sent to backend

//       // Send POST request to the backend login route
//       const response = await axios.post('http://localhost:5000/auth/login', {
//         username,
//         password,
//       });

//       console.log('Response from backend:', response); // Log the response from backend

//       if (response.status === 200) {
//         setSuccess('Login successful! Redirecting...');
        
//         const token = response.data.token;
        
//         // Decode the token and retrieve user ID
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.userId;  // Use the decoded userId

//         // Store the token and userId in local storage or session storage for future API requests
//         localStorage.setItem('userId', userId);
//         localStorage.setItem('token', token);

//         // Redirect to another page after successful login (e.g., Dashboard)
//         setTimeout(() => {
//           navigate('/dashboard');  // Replace with the actual route after login
//         }, 2000);
//       } else {
//         setError('Login failed. Invalid username or password.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default LoginComponent;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For programmatic navigation
import { jwtDecode } from 'jwt-decode';  // Corrected import for jwt-decode

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const [success, setSuccess] = useState(''); // For success message
  const [userId, setUserId] = useState(null); // State to store userId

  const navigate = useNavigate();  // For programmatic navigation after success

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation or state
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    // Input validation
    if (!username || !password) {
      setError('Username and password are required.');
      setLoading(false);
      return;
    }

    try {
      console.log('Logging in with:', { username, password }); // Log the data sent to backend

      // Send POST request to the backend login route
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      console.log('Response from backend:', response); // Log the response from backend

      if (response.status === 200) {
        setSuccess('Login successful! Redirecting...');
        
        const token = response.data.token;
        
        // Decode the token and retrieve user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;  // Use the decoded userId

        // Store the token and userId in local storage or session storage for future API requests
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        // Set the userId in the state to display it
        setUserId(userId);

        // Redirect to another page after successful login (e.g., Dashboard)
        setTimeout(() => {
          navigate('/dashboard');  // Replace with the actual route after login
        }, 2000);
      } else {
        setError('Login failed. Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display the userId if login is successful */}
      {userId && <p>User ID: {userId}</p>}
    </div>
  );
};

export default LoginComponent;

