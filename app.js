// Import required modules
const express = require('express');

const session = require('express-session');
const bodyParser = require("body-parser");
const ejs = require('ejs');
// Import the routes module
const routes = require('./routes/routes');
// Import the custom authentication module
const auth = require('./auth.js');
//path to dotenv file
dotenv.config({
    path: './.env'
})



const app = express();
// Use the session middleware in the Express application
 // The secret used to sign the session ID cookie to ensure it is secure

app.use(session({ secret: "secret" }));
// Configure app to use bodyParser middleware for handling form data
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the view engine for rendering pages
app.set("view engine", "ejs");
// Serve static files from 'public'  directories
app.use(express.static("public"));

// Configures app to use the routes module that has been imported above
app.use(routes);

// Create two users for testing authentication
auth.createUser("user", "pass");

// Test the authentication function
console.log(auth.authenticateUser("user", "pass"));


// Start the server and listen on port 3000
app.listen(3000, () => {
console.log('Server started on port 3000');
});