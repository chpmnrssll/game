var passport    = require("passport"),
    oauth2      = require("../config/oauth2"),
    UserModel   = require("../models/user"),
    ClientModel = require("../models/client");

module.exports = function (app) {
    /*
    app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
    });
     */
    app.get("/ErrorExample", function (req, res, next) {
        next(new Error("Random error!"));
    });

    app.get("/client/:version", function (req, res, next) {
        ClientModel.findOne({
            version : req.params.version
        }, function (err, client) {
            if (err) {
                return done(err);
            }
            if (client) {
                return res.status(200).json({
                    id : client.id,
                    version : client.version,
                    secret : client.secret
                });
            }
        });
    });

    app.post("/token", oauth2.token);

    // register
    app.post("/users", function (req, res, next) {
        var username = req.body["username"],
            password = req.body["password"];

        UserModel.findOne({
            name : username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return res.status(422).json({
                    message : "Username already taken."
                }); //401
            }

            new UserModel({
                name : username,
                password : password
            }).save(function (err, user) {
                if (err) {
                    return console.log(err);
                }
                console.log("New user created - %s:%s", user.name, user.password);
                return res.status(201).json({
                    name : username
                });
            });
        });
    });

    app.get("/users/:username", passport.authenticate("accessToken", {
            session : false
        }), function (req, res, next) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.
        UserModel.findOne({
            name : req.params.username
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(null, false, {
                    message : "Unknown user"
                });
            }
            return res.status(200).json({
                id : user.id,
                name : user.name,
                created : user.created
            });
        });
    });
};
