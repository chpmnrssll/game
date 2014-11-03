var oauth2orize       = require("oauth2orize"),
    passport          = require("passport"),
    crypto            = require("crypto"),
    config            = require("./config"),
    UserModel         = require("../models/user"),
    AccessTokenModel  = require("../models/accessToken"),
    RefreshTokenModel = require("../models/refreshToken"),
    server            = oauth2orize.createServer();

// Removes old access/refresh tokens and generates a new ones (callback hell!!!)
var generateTokens = function (user, client, done) {
    AccessTokenModel.remove({
        user : user.id,
        client : client.id
    }, function (err) {
        if (err) {
            return done(err);
        }
        new AccessTokenModel({
            user : user.id,
            client : client.id
        }).save(function (err, accessToken) {
            if (err) {
                return done(err);
            }
            RefreshTokenModel.remove({
                user : user.id,
                client : client.id
            }, function (err) {
                if (err) {
                    return done(err);
                }
                new RefreshTokenModel({
                    user : user.id,
                    client : client.id
                }).save(function (err, refreshToken) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, accessToken.value, refreshToken.value, {
                        expires_in : config.security.tokenLife
                    });
                });
            });
        });
    });
}

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
        UserModel.findOne({
            name : username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user || !user.checkPassword(password)) {
                return done(null, false);
            }
            generateTokens(user, client, done);
        });
    }));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
        RefreshTokenModel.findOne({
            value : refreshToken,
            client : client.id
        }, function (err, refreshToken) {
            if (err) {
                return done(err);
            }
            if (!refreshToken) {
                return done(null, false);
            }
            UserModel.findById(refreshToken.user, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                generateTokens(user, client, done);
            });
        });
    }));

// token middleware handles client requests to exchange user credentials for access/refresh tokens.
exports.token = [
    passport.authenticate(["clientBasic", "clientPassword"], {
        session : false
    }),
    server.token(),
    server.errorHandler()
];
