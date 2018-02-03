//load env var
require('dotenv').config();

//dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    cors = require('cors');

//static assest
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET, 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());
app.use(cors());

//js as templiting
app.set('view engine', 'ejs');
app.use(expressLayouts);

//connect db
mongoose.connect(process.env.DB_URI);

//set routes
app.use(require('./app/routes'));

//start listening
app.listen(port, () => {
    console.log(`is going on ${port}`);
});