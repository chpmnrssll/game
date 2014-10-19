var config                 = require("./config"),
    passport               = require("passport"),
    BasicStrategy          = require("passport-http").BasicStrategy,
    BearerStrategy         = require("passport-http-bearer").Strategy,
    LocalStrategy          = require("passport-local").Strategy,
    ClientPasswordStrategy = require("passport-oauth2-client-password").Strategy,
    UserModel              = require("../models/user"),
    ClientModel            = require("../models/client"),
    AccessTokenModel       = require("../models/accessToken"),
    RefreshTokenModel      = require("../models/refreshToken");

// This strategy is used to authenticate users based on a username and password.
// Anytime a request is made to authorize an application, we must ensure that
// a user is logged in before asking them to approve the request.
passport.use(new LocalStrategy(function (username, password, done) {

        console.log("localStrategy");

        UserModel.findOne({
            username : username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.checkPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));

// These strategies are used to authenticate registered OAuth clients.  They are
// employed to protect the `token` endpoint, which consumers use to obtain
// access tokens.  The OAuth 2.0 specification suggests that clients use the
// HTTP Basic scheme to authenticate.  Use of the client password strategy
// allows clients to send the same credentials in the request body (as opposed
// to the `Authorization` header).  While this approach is not recommended by
// the specification, in practice it is quite common.
passport.use(new BasicStrategy(function (username, password, done) {

        console.log("basicStrategy");

        ClientModel.findOne({
            clientId : username
        }, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret !== password) {
                return done(null, false);
            }
            return done(null, client);
        });
    }));

passport.use(new ClientPasswordStrategy(function (clientId, clientSecret, done) {

        console.log("clientStrategy");

        ClientModel.findOne({
            clientId : clientId
        }, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret !== clientSecret) {
                return done(null, false);
            }
            return done(null, client);
        });
    }));

// This strategy is used to authenticate either users or clients based on an access token
// (aka a bearer token).  If a user, they must have previously authorized a client,
// which is issued an access token to make requests on behalf of the authorizing user.
passport.use(new BearerStrategy(function (accessToken, done) {

        console.log("bearerStrategy");

        AccessTokenModel.findOne({
            token : accessToken
        }, function (err, token) {
            if (err) {
                return done(err);
            }
            if (!token) {
                return done(null, false);
            }
            if (Math.round((Date.now() - token.created) / 1000) > config.security.tokenLife) {
                AccessTokenModel.remove({
                    token : accessToken
                }, function (err) {
                    if (err) {
                        return done(err);
                    }
                });

                return done(null, false, {
                    message : "Token expired"
                });
            }

            UserModel.findById(token.userId, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message : "Unknown user"
                    });
                }

                var info = {
                    scope : "*"
                };
                done(null, user, info);
            });
        });
    }));
