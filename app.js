// main app starting the express JS app on the server
var express = require('express');

// import other packages here //
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var ejs = require('ejs');



//c onnect app to mongoose
var mongoose = require('mongoose');

// use require keyword to refer and use database module - connect to MLAB
const config = require('./config/database');

//////////////////////////////////////
//          DEFINE ROUTES           //
//////////////////////////////////////

// app route - routes/app.js
var appRoutes = require('./routes/app');
// profile route - routes/profile.js
var profileRoutes = require('./routes/profile');
// posts route - routes/posts.js
var postsRoutes = require('./routes/posts');
// user route - routes/posts.js
var userRoutes = require('./routes/user');
// map route - routes/map.js
var mapRoutes = require('./routes/map');

// create express app - assign to app variable
var app = express();


// connect to mongoose on each request
// connection string that specifies the database - exported from database file
mongoose.connect(config.database);
// set db variable and connection
const db = mongoose.connection;
// get notified if we connect successfully or if a connection error occurs
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to Mongo DB');
});

// favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// built-in logging module - body-parser - middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/app', express.static(path.join(__dirname, 'dist')));


// used to parse cookies
app.use(cookieParser());

// setup the static directory of our project in public folder
app.use(express.static(path.join(__dirname, 'public')));


/*
* Manish Arora
* Stack Overflow - Cross Origin Requests fix
* https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr/32501365
*/

// handle any CORS errors
// request coming from a different origin than the server
app.use(function (req, res, next) {
    // allows any other domain to access server
    res.setHeader('Access-Control-Allow-Origin', '*');
    // which headers we allow on incoming requests
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // which methods we want to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    // set headers and forward the request
    next();
});

// fowards the request - public message board - routes/posts.js
// message routes need to come first
app.use('/message', postsRoutes);
// user routes - will handle authentication
app.use('/user', userRoutes);
// user profile routes - personal message board
app.use('/profile', profileRoutes);
// map routes - display map of messages
app.use('/map', mapRoutes);
// dispatched to the right route - fowards the request - routes/app.js
app.use('/', appRoutes);


// error handling in front end
app.use(function (req, res, next) {
    
    //send index file
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// export app
module.exports = app;
