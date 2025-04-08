const db = require('./db');
const bcrypt = require('bcryptjs');

const User = {
  createUser: (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) throw err;
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], callback);
    });
  },

  findUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  },
};

module.exports = User;
