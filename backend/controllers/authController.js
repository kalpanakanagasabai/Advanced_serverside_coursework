const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// User registration
exports.register = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Password hashing error' });

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error registering user' });
      res.status(201).json({ message: 'User registered' });
    });
  });
};

// User login
exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error during login' });
    if (result.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Password comparison error' });
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
};
