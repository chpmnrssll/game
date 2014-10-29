var faker             = require("faker"),
    mongoose          = require("mongoose"),
    crypto            = require("crypto");
    database          = require("./config/database"),
    UserModel         = require("./models/user"),
    ClientModel       = require("./models/client"),
    AccessTokenModel  = require("./models/accessToken"),
    RefreshTokenModel = require("./models/refreshToken"),
    userId = 0, clientId = 0;

UserModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
    new UserModel({
        name : "admin",
        password : "simple"
    }).save(function (err, user) {
        if (err) {
            return console.log(err);
        }
        console.log("User added to DB - %s:%s", user.name, user.password);
        userId = user.id;
        createFakeUser(4);
    });
});

function createFakeUser(num) {
    new UserModel({
        name : faker.name.firstName().toLowerCase(),
        password : faker.lorem.words(1)[0]
    }).save(function (err, user) {
        if (err) {
            return console.log(err);
        }
        console.log("User added to DB - %s:%s", user.name, user.password);
        if (num-1 > 0) {
            createFakeUser(num-1);
        }
    });
}

ClientModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
    new ClientModel({
        version : "Backbone v1",
        secret : crypto.randomBytes(32).toString("base64")
    }).save(function (err, client) {
        if (err) {
            return console.log(err);
        }
        console.log("Client added to DB - %s:%s", client.version, client.secret);
        clientId = client.id;
    });
});

AccessTokenModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
    //createFakeToken(4);
});

function createFakeToken(num) {
    new AccessTokenModel({
        user : userId,
        client : clientId
    }).save(function (err, accessToken) {
        if (err) {
            return console.log(err);
        }
        console.log("Token added to DB - %s", accessToken.value);
        if (num-1 > 0) {
            createFakeToken(num-1);
        }
    });
}

RefreshTokenModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
});

setTimeout(function () {
    mongoose.disconnect();
}, 3000);
/*
{
    "id": "54508cd30cf72048110cb202",
    "version": "Backbone v1",
    "secret": "xN+xIKpcKXEykRX+NCw/hHEEJSgqDEsDeDb+cOu3SF8="
}
*/