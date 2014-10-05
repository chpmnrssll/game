// set up
var express  = require("express");
var mongoose = require("mongoose");
var database = require("./config/database");
var port  	 = process.env.PORT || 80;
var app      = express();

var logger = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// configuration
mongoose.connect(database.url);
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(logger('dev'));                         // log every request to the console
app.use(bodyParser());                          // pull information from html in POST
app.use(methodOverride());                      // simulate DELETE and PUT

// routes
require('./controllers/routes.js')(app);

// listen (start app with node server.js)
app.listen(port);
console.log("App listening on port " + port);