var oauth2orize       = require("oauth2orize"),
    passport          = require("passport"),
    crypto            = require("crypto"),
    config            = require("./config"),
    UserModel         = require("../models/user"),
    AccessTokenModel  = require("../models/accessToken"),
    RefreshTokenModel = require("../models/refreshToken"),
    server            = oauth2orize.createServer();

// Generic error handler
var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};

// Destroys any old tokens and generates a new access and refresh token
var generateTokens = function (modelData, done) {
    var errorHandler = errFn.bind(undefined, done), // curries in `done` callback so we don"t need to pass it
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    console.log("generateTokens");

    RefreshTokenModel.remove(modelData, errorHandler);
    AccessTokenModel.remove(modelData, errorHandler);

    tokenValue = crypto.randomBytes(32).toString("base64");
    refreshTokenValue = crypto.randomBytes(32).toString("base64");

    modelData.token = tokenValue;
    token = new AccessTokenModel(modelData);

    modelData.token = refreshTokenValue;
    refreshToken = new RefreshTokenModel(modelData);

    refreshToken.save(errorHandler);
    token.save(function (err) {
        if (err) {
            return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {
            "expires_in" : config.security.tokenLife
        });
    });
};

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {

        console.log("exchange.password");

        UserModel.findOne({
            username : username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user || !user.checkPassword(password)) {
                return done(null, false);
            }

            var modelData = {
                userId : user.userId,
                clientId : client.clientId
            };
            generateTokens(modelData, done);
        });
    }));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

        console.log("exchange.refreshToken");

        RefreshTokenModel.findOne({
            token : refreshToken,
            clientId : client.clientId
        }, function (err, token) {
            if (err) {
                return done(err);
            }
            if (!token) {
                return done(null, false);
            }

            UserModel.findById(token.userId, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }

                var modelData = {
                    userId : user.userId,
                    clientId : client.clientId
                };
                generateTokens(modelData, done);
            });
        });
    }));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.
exports.token = [
    passport.authenticate(["basic", "oauth2-client-password"], {
        session : false
    }),
    server.token(),
    server.errorHandler()
];
