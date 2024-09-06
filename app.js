// Import required modules
const express = require('express');
//import path
const path = require('path');

//const session = require('express-session');
const bodyParser = require("body-parser");
const ejs = require('ejs');

// Import the custom authentication module
const auth = require('./auth.js');
//path to dotenv file
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
})



const app = express();
// Use the session middleware in the Express application
 // The secret used to sign the session ID cookie to ensure it is secure
 //store the path to public directory in a variable
 //dirname gives you directory you are in and join allows you to join with another folder from that directory
const publicDirectory = path.join(__dirname, '/public');
//app.use(session({ secret: "secret" }));
// Configure app to use bodyParser middleware for handling form data
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the view engine for rendering pages
app.set("view engine", "ejs");
// Serve static files from 'public'  directories
app.use(express.static("public"));

// Configures app to use the routes module that has been imported above
//define routes
app.use('/', require("./routes/routes"));
app.use('/auth', require("./routes/auth"))



// Start the server and listen on port 3000
app.listen(3000, () => {
console.log('Server started on port 3000');
});