// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const RegisterComponent = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     // Input validation
//     if (!username || !password || !confirmPassword) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log('Registering with:', { username, password });

//       const response = await axios.post('http://localhost:5000/auth/register', {
//         username,
//         password,
//       });

//       console.log('Response from backend:', response);

//       if (response.status === 201) {
//         setSuccess('Registration successful! Redirecting to login...');
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setError(err.response ? err.response.data.message : 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
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
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default RegisterComponent;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Input validation
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      console.log('Registering with:', { username, password });

      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
      });

      console.log('Response from backend:', response);

      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store JWT in local storage
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response ? err.response.data.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default RegisterComponent;
