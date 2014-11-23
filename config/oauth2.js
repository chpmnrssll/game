var oauth2orize       = require("oauth2orize"),
    passport          = require("passport"),
    crypto            = require("crypto"),
    config            = require("./config"),
    UserModel         = require("../models/user"),
    AccessTokenModel  = require("../models/accessToken"),
    RefreshTokenModel = require("../models/refreshToken"),
    server            = oauth2orize.createServer();

// removes old access/refresh tokens and generates a new ones (callback hell!!!)
var generateTokens = function (user, client, next) {
    AccessTokenModel.remove({
        user : user.id,
        client : client.id
    }, function (err) {
        if (err) {
            return next(err);
        }
        new AccessTokenModel({
            user : user.id,
            client : client.id
        }).save(function (err, accessToken) {
            if (err) {
                return next(err);
            }
            RefreshTokenModel.remove({
                user : user.id,
                client : client.id
            }, function (err) {
                if (err) {
                    return next(err);
                }
                new RefreshTokenModel({
                    user : user.id,
                    client : client.id
                }).save(function (err, refreshToken) {
                    if (err) {
                        return next(err);
                    }
                    return next(null, accessToken.value, refreshToken.value, {
                        expires_in : config.security.tokenLife,
                        user_id : user.id
                    });
                });
            });
        });
    });
}

// exchange username & password for access token
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, next) {
        UserModel.findOne({
            name : username
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user || !user.checkPassword(password)) {
                return next(null, false);
            }
            generateTokens(user, client, next);
        });
    }));

// exchange refreshToken for access token
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, next) {
        RefreshTokenModel.findOne({
            value : refreshToken,
            client : client.id
        }, function (err, refreshToken) {
            if (err) {
                return next(err);
            }
            if (!refreshToken) {
                return next(null, false);
            }
            UserModel.findById(refreshToken.user, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(null, false);
                }
                generateTokens(user, client, next);
            });
        });
    }));

// token middleware handles client requests to exchange user credentials for access/refresh tokens
exports.token = [
    passport.authenticate(["clientBasic", "clientPassword"], {
        session : false
    }),
    server.token(),
    server.errorHandler()
];
