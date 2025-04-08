const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();  // For environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',     // Database host
  user: 'root',          // Database username
  password: '1234',          // Database password
  database: 'user_db'    // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Register Route
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if the user already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error during registration' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Database error during user creation' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error during login' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
