var passport               = require("passport"),
    BasicStrategy          = require("passport-http").BasicStrategy,
    BearerStrategy         = require("passport-http-bearer").Strategy,
    ClientPasswordStrategy = require("passport-oauth2-client-password").Strategy,
    config                 = require("./config"),
    UserModel              = require("../models/user"),
    ClientModel            = require("../models/client"),
    AccessTokenModel       = require("../models/accessToken");

// The clientBasic strategy allows clients to use the HTTP Basic scheme to send credentials.
// Authorization header : {
//  username : client.id,
//  password : client.secret }
// Request body : {
//  grant_type : "password",
//  username   : user.name,
//  password   : user.password }
passport.use("clientBasic", new BasicStrategy(function (clientId, clientSecret, done) {
        ClientModel.findById(clientId, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client || client.secret !== clientSecret) {
                return done(null, false);
            }
            return done(null, client);
        });
    }));

// The clientPassword strategy allows clients to send the credentials in the request body.
// Request body : {
//  grant_type    : "password",
//  username      : user.name,
//  password      : user.password 
//  client_id     : client.id,
//  client_secret : client.secret }
passport.use("clientPassword", new ClientPasswordStrategy(function (clientId, clientSecret, done) {
        ClientModel.findById(clientId, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client || client.secret !== clientSecret) {
                return done(null, false);
            }
            return done(null, client);
        });
    }));

// This accessToken strategy allows clients to authenticate requests based on an access token.
// Authorization header : { "Bearer" : token.value }
passport.use("accessToken", new BearerStrategy(function (accessToken, done) {
        AccessTokenModel.findOne({
            value : accessToken
        }, function (err, token) {
            if (err) {
                return done(err);
            }
            if (!token) {
                return done(null, false);
            }
            if (token.expired()) {
                AccessTokenModel.remove({
                    value : accessToken
                }, function (err) {
                    if (err) {
                        return done(err);
                    }
                });
                return done(null, false, {
                    message : "Token expired"
                });
            }
            UserModel.findById(token.user, function (err, user) {
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
                // req.authInfo is set using the `info` argument. It is typically used to
                // indicate scope of the token, and used in access control checks.
                done(null, user, info);
            });
        });
    }));
