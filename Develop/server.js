// Dependencies
// Series of npm packages that we will use to give our server useful functionality

const fs = require('fs');
const path = require('path');
const express = require('express');

// Express Configuration
// This sets up the basic properties for our express server

let app = express();    // Tells node we are creating an "express" server
let PORT = process.env.PORT || 8080;    // Sets 8080 as the backup port

// Middlewear 

// Why does this successfully link the css?
app.use(express.static("public"));
app.use(express.static("db"));

// This middlewear will look in the specific folder "public", the first /public will be expossed first (it is an alias). It needs this or else it wont know what to look for.
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/db", express.static(path.join(__dirname, 'db')));

// This will set up the express app to handle sending a JSON string through POST, and process it as and object, turning it into a string, and turning it back into an object in "request.body"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Listener
// This starts our server

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});