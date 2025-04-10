const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Host is usually localhost
    user: 'root', // MySQL username
    password: '1234', // MySQL password
    database: 'user_registration_db' // The correct database name you want to use
});

// Establish a connection to the MySQL server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Export the connection to be used in other parts of your application
module.exports = db;
