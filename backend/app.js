// // const express = require('express');
// // const mysql = require('mysql2');
// // const bcrypt = require('bcryptjs');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const jwt = require('jsonwebtoken'); // Import JWT for token generation

// // const app = express();
// // const port = 5000;

// // // Database connection setup
// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root', // Replace with your MySQL username
// //   password: '1234', // Replace with your MySQL password
// //   database: 'user_registration_db', // Replace with your database name
// // });

// // db.connect((err) => {
// //   if (err) {
// //     console.error('Database connection error:', err);
// //   } else {
// //     console.log('Connected to MySQL database');
// //   }
// // });

// // // Middleware
// // app.use(cors()); // Enable CORS for all domains
// // app.use(bodyParser.json()); // Parse JSON bodies

// // // Register Route
// // app.post('/auth/register', async (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ message: 'Username and password are required' });
// //   }

// //   try {
// //     // Check if the user already exists
// //     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
// //       if (err) {
// //         console.error('Database error during registration:', err);
// //         return res.status(500).json({ message: 'Database error during registration' });
// //       }

// //       if (results.length > 0) {
// //         return res.status(400).json({ message: 'Username already exists' });
// //       }

// //       // Hash the password
// //       const hashedPassword = await bcrypt.hash(password, 10);

// //       // Insert the new user into the database
// //       db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
// //         if (err) {
// //           console.error('Database error during user creation:', err);
// //           return res.status(500).json({ message: 'Database error during user creation' });
// //         }

// //         res.status(201).json({ message: 'User registered successfully' });
// //       });
// //     });
// //   } catch (error) {
// //     console.error('Unexpected error during registration:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // Login Route
// // app.post('/auth/login', (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ message: 'Username and password are required' });
// //   }

// //   try {
// //     // Check if the user exists
// //     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
// //       if (err) {
// //         console.error('Database error during login:', err);
// //         return res.status(500).json({ message: 'Database error during login' });
// //       }

// //       if (results.length === 0) {
// //         return res.status(400).json({ message: 'Invalid username or password' });
// //       }

// //       const user = results[0];

// //       // Compare the provided password with the hashed password
// //       const isPasswordValid = await bcrypt.compare(password, user.password);

// //       if (!isPasswordValid) {
// //         return res.status(400).json({ message: 'Invalid username or password' });
// //       }

// //       // Generate JWT token (with an expiration time of 1 hour)
// //       const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });

// //       // Respond with the token
// //       res.status(200).json({
// //         message: 'Login successful',
// //         token: token, // Send the token as response
// //       });
// //     });
// //   } catch (error) {
// //     console.error('Unexpected error during login:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });


// const express = require('express');
// const mysql = require('mysql2');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
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
//   origin: 'http://localhost:3000', // adjust this to match your frontend URL
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
//       if (err) return res.status(500).json({ message: 'Database error during registration' });
//       if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

//       const hashedPassword = await bcrypt.hash(password, 10);
//       db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Database error during user creation' });

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
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // LOGIN
// app.post('/auth/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

//   try {
//     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//       if (err) return res.status(500).json({ message: 'Database error during login' });
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
  origin: 'http://localhost:3000', // adjust this to match your frontend URL
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
      if (err) return res.status(500).json({ message: 'Database error during registration' });
      if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error during user creation' });

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
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGIN
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error during login' });
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
      return res.status(500).json({ message: 'Failed to generate API key' });
    }

    // Send the generated API key back in the response
    res.json({ apiKey });
  });
});

// SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
