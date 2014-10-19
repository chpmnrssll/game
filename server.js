var bodyParser     = require("body-parser"),
    compression    = require("compression"),
    express        = require("express"),
    methodOverride = require("method-override"),
    logger         = require("morgan"),
    passport       = require("passport"),
    favicon        = require("serve-favicon"),
    config         = require("./config/config"),
    database       = require("./config/database"),
    app            = express();

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(__dirname + "/public"));             // set the static files location (will be / for users)
app.use(bodyParser.urlencoded({ extended : false }));       // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type : "application/json" }));    // parse application/json
app.use(compression());                                     // use gzip compression
app.use(methodOverride());                                  // simulate DELETE and PUT
app.use(logger("dev"));                                     // log every request to the console
app.use(passport.initialize());

require("./config/passport");                               // setup passport & strategies
require("./controllers/routes.js")(app);                    // setup routes
app.listen(config.server.port);
console.log("App started.");
