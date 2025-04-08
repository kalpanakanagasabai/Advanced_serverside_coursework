// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(process.env.DATABASE_PATH || './db/users.sqlite');

// // Create tables if not already created
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )`);
// });

// module.exports = db;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Construct absolute path to the database file
const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
