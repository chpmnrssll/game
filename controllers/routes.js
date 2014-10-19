var passport = require("passport"),
    oauth2   = require("../config/oauth2");

module.exports = function (app) {

    /*
    app.get("*", function (req, res) {
        res.sendFile("./public/index.html"); // load the single view file (backbone will handle the page changes on the front-end)
    });
    */

    app.post("/auth/login", function (req, res, next) {
        passport.authenticate("local", {
            session : false
        }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            return res.status(200).json(info);
        })(req, res, next);
    });

    app.post("/auth/client", function (req, res, next) {
        passport.authenticate(["basic", "oauth2-client-password"], {
            session : false
        }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            return res.status(200).json(info);
        })(req, res, next);
    });

    app.post("/auth/token", oauth2.token);

    app.get("/api/userInfo", passport.authenticate("bearer", {
            session : false
        }), function (req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({
            user_id : req.user.userId,
            name : req.user.username,
            scope : req.authInfo.scope
        });
    });

    app.get("/ErrorExample", function (req, res, next) {
        next(new Error("Random error!"));
    });
};
