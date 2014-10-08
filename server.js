var bodyParser     = require("body-parser");
var express        = require("express");
var session        = require("express-session");
var methodOverride = require("method-override");
var mongoose       = require("mongoose");
var logger         = require("morgan");
var passport       = require("passport");
var localStrategy  = require("passport-local").Strategy;
var favicon        = require("serve-favicon");

// configuration
var database = require("./config/database");
var app = express();

mongoose.connect(database.url);
app.use(session({ secret: "move to config", saveUninitialized: true, resave: true }));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(__dirname + "/public"));         // set the static files location (will be / for users)
app.use(bodyParser.json());                             // pull information from html in POST
app.use(methodOverride());                              // simulate DELETE and PUT
app.use(logger("dev"));                                 // log every request to the console
app.use(passport.initialize());
app.use(passport.session());
require("./passport/init")(passport, localStrategy);    // setup passport & localStrategy
require("./controllers/routes.js")(app, passport);      // setup routes
app.listen(process.env.PORT || 80);                     // listen (start app with node server.js)
console.log("App started.");