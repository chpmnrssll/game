var bodyParser     = require("body-parser");
var compression    = require("compression");
var express        = require("express");
var methodOverride = require("method-override");
var mongoose       = require("mongoose");
var logger         = require("morgan");
var passport       = require("passport");
var favicon        = require("serve-favicon");

// configuration
var database = require("./config/database");
var app = express();

mongoose.connect(database.url);
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(__dirname + "/public"));         // set the static files location (will be / for users)
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: "application/json" })); // parse application/json
app.use(compression());                                 // use gzip compression
app.use(methodOverride());                              // simulate DELETE and PUT
app.use(logger("dev"));                                 // log every request to the console
app.use(passport.initialize());
require("./config/passport")(passport);                 // setup passport & strategies
require("./controllers/routes.js")(app, passport);      // setup routes

app.listen(process.env.PORT || 80);                     // listen (start app with node server.js)
console.log("App started.");