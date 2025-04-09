// // const express = require('express');
// // const mysql = require('mysql2');
// // const bcrypt = require('bcryptjs');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const jwt = require('jsonwebtoken');
// // const crypto = require('crypto'); // For generating a secure API key
// // const cookieParser = require('cookie-parser'); // NEW

// // const app = express();
// // const port = 5000;

// // // Secret key for JWT
// // const JWT_SECRET = 'your_jwt_secret_key';

// // // Database connection setup
// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: '1234',
// //   database: 'user_registration_db',
// // });

// // db.connect((err) => {
// //   if (err) {
// //     console.error('Database connection error:', err);
// //   } else {
// //     console.log('Connected to MySQL database');
// //   }
// // });

// // // Middleware
// // app.use(cors({
// //   origin: 'http://localhost:3000', 
// //   credentials: true // ALLOWS COOKIES
// // }));
// // app.use(bodyParser.json());
// // app.use(cookieParser());

// // // JWT middleware to protect routes
// // const verifyToken = (req, res, next) => {
// //   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ message: 'Invalid or Expired Token' });
// //   }
// // };

// // // REGISTER
// // app.post('/auth/register', async (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ message: 'Username and password are required' });
// //   }

// //   try {
// //     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
// //       if (err) return res.status(500).json({ message: 'Database error during registration' });
// //       if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

// //       const hashedPassword = await bcrypt.hash(password, 10);
// //       db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
// //         if (err) return res.status(500).json({ message: 'Database error during user creation' });

// //         // Generate token after registration
// //         const userId = results.insertId;
// //         const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

// //         // Set cookie
// //         res.cookie('token', token, {
// //           httpOnly: true,
// //           secure: false, // Set to true in production with HTTPS
// //           sameSite: 'Lax',
// //           maxAge: 3600000,
// //         });

// //         res.status(201).json({ message: 'User registered successfully', token });
// //       });
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // LOGIN
// // app.post('/auth/login', (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

// //   try {
// //     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
// //       if (err) return res.status(500).json({ message: 'Database error during login' });
// //       if (results.length === 0) return res.status(400).json({ message: 'Invalid username or password' });

// //       const user = results[0];
// //       const isPasswordValid = await bcrypt.compare(password, user.password);
// //       if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

// //       const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

// //       // Set token in cookie
// //       res.cookie('token', token, {
// //         httpOnly: true,
// //         secure: false,
// //         sameSite: 'Lax',
// //         maxAge: 3600000,
// //       });

// //       res.status(200).json({ message: 'Login successful', token });
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // LOGOUT
// // app.post('/auth/logout', (req, res) => {
// //   res.clearCookie('token');
// //   res.status(200).json({ message: 'Logged out successfully' });
// // });

// // // PROTECTED ROUTE EXAMPLE
// // app.get('/profile', verifyToken, (req, res) => {
// //   res.status(200).json({ message: `Welcome, user ${req.user.userId}` });
// // });

// // // Route to generate an API key
// // app.post('/api/generate-api-key', verifyToken, (req, res) => {
// //   const { userId } = req.body; // Get userId from the request body

// //   // Check if userId is provided
// //   if (!userId) {
// //     return res.status(400).json({ message: 'User ID is required' });
// //   }

// //   // Generate a secure API key (64-character hex string)
// //   const apiKey = crypto.randomBytes(32).toString('hex'); 

// //   // Store the API key in the database
// //   db.execute('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', [userId, apiKey], (err, result) => {
// //     if (err) {
// //       return res.status(500).json({ message: 'Failed to generate API key' });
// //     }

// //     // Send the generated API key back in the response
// //     res.json({ apiKey });
// //   });
// // });


// // // Middleware to parse JSON bodies
// // app.use(express.json());
// // app.use(cors());


// // // API Key Validation Middleware
// // const validateApiKey = (req, res, next) => {
// //   const apiKey = req.headers['x-api-key']; // Fetch the API key from headers
// //   if (!apiKey) {
// //     return res.status(400).json({ message: 'API key is missing.' });
// //   }

// //   // Query to check if the provided API key is valid
// //   db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, results) => {
// //     if (err) {
// //       console.error('Database error:', err);
// //       return res.status(500).json({ message: 'Database error.' });
// //     }

// //     if (results.length === 0) {
// //       return res.status(401).json({ message: 'Invalid API key.' });
// //     }

// //     // If valid, proceed to the next middleware
// //     next();
// //   });
// // };


// // const axios = require('axios');

// // // Protected Route to fetch country information
// // app.get('/api/countries/info', validateApiKey, async (req, res) => {
// //   const countryName = req.query.name; // Get the country name from the query parameter

// //   if (!countryName) {
// //     return res.status(400).json({ error: 'Country name is required' });
// //   }

// //   try {
// //     // Fetch country data from the RestCountries API
// //     const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);

// //     if (response.data.length === 0) {
// //       return res.status(404).json({ error: 'Country not found' });
// //     }

// //     const country = response.data[0]; // Get the first result from the API response

// //     const countryData = {
// //       name: country.name.common,  // Country name
// //       capital: country.capital ? country.capital[0] : 'N/A',  // Handle missing capital
// //       currency: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',  // Handle missing currency
// //       languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',  // Handle missing languages
// //       flag: country.flags[0], // Flag image URL
// //     };

// //     res.json(countryData);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Failed to fetch country data. Please try again later.' });
// //   }
// // });



// // // SERVER
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });


// const express = require('express');
// const mysql = require('mysql2');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto'); // For generating a secure API key
// const cookieParser = require('cookie-parser'); // NEW

// const app = express();
// const port = 5000;

// // Secret key for JWT
// const JWT_SECRET = 'your_jwt_secret_key';

// // Database connection setup
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'user_registration_db',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection error:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true // ALLOWS COOKIES
// }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // JWT middleware to protect routes
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error('JWT verification error:', err);
//     res.status(401).json({ message: 'Invalid or Expired Token' });
//   }
// };

// // REGISTER
// app.post('/auth/register', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//       if (err) {
//         console.error('Database error during registration:', err);
//         return res.status(500).json({ message: 'Database error during registration' });
//       }
//       if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
//         if (err) {
//           console.error('Database error during user creation:', err);
//           return res.status(500).json({ message: 'Database error during user creation' });
//         }

//         // Generate token after registration
//         const userId = results.insertId;
//         const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

//         // Set cookie
//         res.cookie('token', token, {
//           httpOnly: true,
//           secure: false, // Set to true in production with HTTPS
//           sameSite: 'Lax',
//           maxAge: 3600000,
//         });

//         res.status(201).json({ message: 'User registered successfully', token });
//       });
//     });
//   } catch (error) {
//     console.error('Internal server error during registration:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // LOGIN
// app.post('/auth/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

//   try {
//     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//       if (err) {
//         console.error('Database error during login:', err);
//         return res.status(500).json({ message: 'Database error during login' });
//       }
//       if (results.length === 0) return res.status(400).json({ message: 'Invalid username or password' });

//       const user = results[0];
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

//       const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//       // Set token in cookie
//       res.cookie('token', token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'Lax',
//         maxAge: 3600000,
//       });

//       res.status(200).json({ message: 'Login successful', token });
//     });
//   } catch (error) {
//     console.error('Internal server error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // LOGOUT
// app.post('/auth/logout', (req, res) => {
//   res.clearCookie('token');
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// // PROTECTED ROUTE EXAMPLE
// app.get('/profile', verifyToken, (req, res) => {
//   res.status(200).json({ message: `Welcome, user ${req.user.userId}` });
// });

// // Route to generate an API key
// app.post('/api/generate-api-key', verifyToken, (req, res) => {
//   const { userId } = req.body; // Get userId from the request body

//   // Check if userId is provided
//   if (!userId) {
//     return res.status(400).json({ message: 'User ID is required' });
//   }

//   // Generate a secure API key (64-character hex string)
//   const apiKey = crypto.randomBytes(32).toString('hex'); 

//   // Store the API key in the database
//   db.execute('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', [userId, apiKey], (err, result) => {
//     if (err) {
//       console.error('Failed to generate API key:', err);
//       return res.status(500).json({ message: 'Failed to generate API key' });
//     }

//     // Send the generated API key back in the response
//     res.json({ apiKey });
//   });
// });

// // // API Key Validation Middleware
// // const validateApiKey = (req, res, next) => {
// //   const apiKey = req.headers['x-api-key']; // Fetch the API key from headers
// //   if (!apiKey) {
// //     return res.status(400).json({ message: 'API key is missing.' });
// //   }

// //   // Query to check if the provided API key is valid
// //   db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, results) => {
// //     if (err) {
// //       console.error('Database error:', err);
// //       return res.status(500).json({ message: 'Database error.' });
// //     }

// //     if (results.length === 0) {
// //       return res.status(401).json({ message: 'Invalid API key.' });
// //     }

// //     // Update the last used date/time and increment usage count
// //     const now = new Date();
// //     db.query('UPDATE api_keys SET last_used = ?, usage_count = usage_count + 1 WHERE api_key = ?', [now, apiKey], (updateErr) => {
// //       if (updateErr) {
// //         console.error('Error updating API key usage:', updateErr);
// //       }
// //     });

// //     // If valid, proceed to the next middleware
// //     next();
// //   });
// // };

// const validateApiKey = (req, res, next) => {
//   const apiKey = req.headers['x-api-key']; // Fetch the API key from headers
//   if (!apiKey) {
//     return res.status(400).json({ message: 'API key is missing.' });
//   }

//   // Query to check if the provided API key is valid
//   db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, results) => {
//     if (err) {
//       console.error('Database error while checking API key:', err);
//       return res.status(500).json({ message: 'Database error.' });
//     }

//     if (results.length === 0) {
//       console.log('API key not found');
//       return res.status(401).json({ message: 'Invalid API key.' });
//     }

//     const apiKeyRecord = results[0];
//     console.log('API Key Record:', apiKeyRecord); // Debugging log

//     // If valid, update the last used date-time and increment usage count
//     const now = new Date(); // Get the current timestamp

//     console.log('Updating usage_count and last_used for API key:', apiKey);

//     // Update the usage_count and last_used columns
//     db.query(
//       'UPDATE api_keys SET last_used = ?, usage_count = usage_count + 1 WHERE api_key = ?',
//       [now, apiKey],
//       (updateErr, updateResult) => {
//         if (updateErr) {
//           console.error('Error updating API key usage:', updateErr);
//           return res.status(500).json({ message: 'Error updating API key usage.' });
//         }

//         console.log('Update Result:', updateResult); // Debugging log
//         if (updateResult.affectedRows > 0) {
//           console.log('Usage count and last_used updated successfully.');
//         } else {
//           console.log('No rows affected during update, API key might not exist.');
//         }

//         // Proceed to the next middleware
//         next();
//       }
//     );
//   });
// };

// const axios = require('axios');

// // Protected Route to fetch country information
// app.get('/api/countries/info', validateApiKey, async (req, res) => {
//   const countryName = req.query.name; // Get the country name from the query parameter

//   if (!countryName) {
//     return res.status(400).json({ error: 'Country name is required' });
//   }

//   try {
//     // Fetch country data from the RestCountries API
//     const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);

//     if (response.data.length === 0) {
//       return res.status(404).json({ error: 'Country not found' });
//     }

//     const country = response.data[0]; // Get the first result from the API response

//     const countryData = {
//       name: country.name.common,  // Country name
//       capital: country.capital ? country.capital[0] : 'N/A',  // Handle missing capital
//       currency: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',  // Handle missing currency
//       languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',  // Handle missing languages
//       flag: country.flags[0], // Flag image URL
//     };

//     res.json(countryData);
//   } catch (error) {
//     console.error('Error fetching country data:', error);
//     res.status(500).json({ error: 'Failed to fetch country data. Please try again later.' });
//   }
// });

// // SERVER
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating a secure API key
const cookieParser = require('cookie-parser'); // NEW
const axios = require('axios');

const app = express();
const port = 5000;

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'user_registration_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // ALLOWS COOKIES
}));
app.use(bodyParser.json());
app.use(cookieParser());

// JWT middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

// REGISTER
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Database error during registration:', err);
        return res.status(500).json({ message: 'Database error during registration' });
      }
      if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
          console.error('Database error during user creation:', err);
          return res.status(500).json({ message: 'Database error during user creation' });
        }

        // Generate token after registration
        const userId = results.insertId;
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

        // Set cookie
        res.cookie('token', token, {
          httpOnly: true,
          secure: false, // Set to true in production with HTTPS
          sameSite: 'Lax',
          maxAge: 3600000,
        });

        res.status(201).json({ message: 'User registered successfully', token });
      });
    });
  } catch (error) {
    console.error('Internal server error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGIN
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Database error during login:', err);
        return res.status(500).json({ message: 'Database error during login' });
      }
      if (results.length === 0) return res.status(400).json({ message: 'Invalid username or password' });

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      // Set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
      });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Internal server error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGOUT
app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// PROTECTED ROUTE EXAMPLE
app.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome, user ${req.user.userId}` });
});

// Route to generate an API key
app.post('/api/generate-api-key', verifyToken, (req, res) => {
  const { userId } = req.body; // Get userId from the request body

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Generate a secure API key (64-character hex string)
  const apiKey = crypto.randomBytes(32).toString('hex');

  // Store the API key in the database
  db.execute('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', [userId, apiKey], (err, result) => {
    if (err) {
      console.error('Failed to generate API key:', err);
      return res.status(500).json({ message: 'Failed to generate API key' });
    }

    // Send the generated API key back in the response
    res.json({ apiKey });
  });
});

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log('Entering validateApiKey middleware');
  console.log('Received API Key:', apiKey);

  if (!apiKey) {
    console.log('API key is missing in headers.');
    return res.status(400).json({ message: 'API key is missing.' });
  }

  db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey], (err, results) => {
    if (err) {
      console.error('Database error while checking API key:', err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      console.log('API key not found in database:', apiKey);
      return res.status(401).json({ message: 'Invalid API key.' });
    }

    const apiKeyRecord = results[0];
    console.log('API Key Record Found:', apiKeyRecord);

    const now = new Date();
    console.log('Current Timestamp:', now);

    db.query(
      'UPDATE api_keys SET last_used = ?, usage_count = usage_count + 1 WHERE api_key = ?',
      [now, apiKey],
      (updateErr, updateResult) => {
        console.log('UPDATE Query:', this.sql); // Log the actual SQL query
        if (updateErr) {
          console.error('Error updating API key usage:', updateErr);
          return res.status(500).json({ message: 'Error updating API key usage.' });
        }

        console.log('Update Result:', updateResult);
        if (updateResult.affectedRows > 0) {
          console.log('Successfully updated usage_count and last_used for API key:', apiKey);
        } else {
          console.log('No rows updated for API key:', apiKey, '. Possible mismatch or issue with WHERE clause.');
        }

        next();
      }
    );
  });
};

// Protected Route to fetch country information
app.get('/api/countries/info', validateApiKey, async (req, res) => {
  const countryName = req.query.name; // Get the country name from the query parameter

  if (!countryName) {
    return res.status(400).json({ error: 'Country name is required' });
  }

  try {
    // Fetch country data from the RestCountries API
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const country = response.data[0]; // Get the first result from the API response

    const countryData = {
      name: country.name.common,   // Country name
      capital: country.capital ? country.capital[0] : 'N/A',   // Handle missing capital
      currency: country.currencies ? Object.keys(country.currencies).join(', ') : 'N/A',   // Handle missing currency
      languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',   // Handle missing languages
      flag: country.flags.svg, // Flag image URL (using svg)
    };

    res.json(countryData);
  } catch (error) {
    console.error('Error fetching country data:', error);
    res.status(500).json({ error: 'Failed to fetch country data. Please try again later.' });
  }
});

// Simple test route with API key authentication
app.get('/api/test-auth', validateApiKey, (req, res) => {
  res.json({ message: 'API Key Validated Successfully' });
});


// SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});