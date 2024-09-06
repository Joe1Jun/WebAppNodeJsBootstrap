// configures database and exports it as a module
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
// Create a connection to the MySQL database
const connection = mysql2.createConnection({
    
     // Hostname of the MySQL server
    host: process.env.DATABASE_HOST,
    // Username for authentication
    user: process.env.DATABASE_USER,
     // passowrd for authentication
    password:  process.env.DATABASE_PASSWORD,
     // Database name
    database: process.env.DATABASE 
});
// Attempt to establish a connection to the MySQL database
connection.connect((err) => {
    // If an error occurs during the connection attempt, log the error
    if (err) {
        console.error('Error connecting to database: ', err);
        // If the connection is successful, log a confirmation message
    } else {
        console.log('Connected to database!');
    }
});
// Export the connection object to be used in other modules

module.exports = connection;
