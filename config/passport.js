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
passport.use("clientBasic", new BasicStrategy(function (clientId, clientSecret, next) {
        ClientModel.findById(clientId, function (err, client) {
            if (err) {
                return next(err);
            }
            if (!client || client.secret !== clientSecret) {
                return next(null, false);
            }
            return next(null, client);
        });
    }));

// The clientPassword strategy allows clients to send the credentials in the request body.
// Request body : {
//  grant_type    : "password",
//  username      : user.name,
//  password      : user.password 
//  client_id     : client.id,
//  client_secret : client.secret }
passport.use("clientPassword", new ClientPasswordStrategy(function (clientId, clientSecret, next) {
        ClientModel.findById(clientId, function (err, client) {
            if (err) {
                return next(err);
            }
            if (!client || client.secret !== clientSecret) {
                return next(null, false);
            }
            return next(null, client);
        });
    }));

// This accessToken strategy allows clients to authenticate requests based on an access token.
// Authorization header : { "Bearer" : token.value }
passport.use("accessToken", new BearerStrategy(function (accessToken, next) {
        AccessTokenModel.findOne({
            value : accessToken
        }, function (err, token) {
            if (err) {
                return next(err);
            }
            if (!token) {
                return next(null, false);
            }
            if (token.expired()) {
                AccessTokenModel.remove({
                    value : accessToken
                }, function (err) {
                    if (err) {
                        return next(err);
                    }
                });
                return next(null, false, {
                    message : "Token expired"
                });
            }
            UserModel.findById(token.user, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(null, false, {
                        message : "Unknown user"
                    });
                }
                var info = {
                    scope : "*"
                };
                // req.authInfo is set using the `info` argument. It is typically used to
                // indicate scope of the token, and used in access control checks.
                next(null, user, info);
            });
        });
    }));
