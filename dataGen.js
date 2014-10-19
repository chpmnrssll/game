var faker             = require("faker"),
    mongoose          = require("mongoose"),
    database          = require("./config/database"),
    UserModel         = require("./models/user"),
    ClientModel       = require("./models/client"),
    AccessTokenModel  = require("./models/accessToken"),
    RefreshTokenModel = require("./models/refreshToken");

UserModel.remove({}, function (err) {
    var user = new UserModel({
            username : "russ",
            password : "simple"
        }),
        i;

    user.save(function (err, user) {
        if (err) {
            return console.log(err);
        }
        console.log("New user - %s:%s", user.username, user.password);
    });

    for (i = 0; i < 4; i++) {
        createFakeUser();
    }
});

function createFakeUser() {
    var words = faker.lorem.words(1),
        user = new UserModel({
            username : faker.name.firstName().toLowerCase(),
            password : words[0]
        });

    user.save(function (err, user) {
        if (err) {
            return console.log(err);
        }
        console.log("New user - %s:%s", user.username, user.password);
    });
}

ClientModel.remove({}, function (err) {
    var client = new ClientModel({
            name : "GameAPI Browser client v1",
            clientId : "russ",
            clientSecret : "abc123456"
        });

    client.save(function (err, client) {
        if (err) {
            return console.log(err);
        }
        console.log("New client - %s:%s", client.clientId, client.clientSecret);
    });
});

AccessTokenModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
});

RefreshTokenModel.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
});

setTimeout(function () {
    mongoose.disconnect();
}, 3000);
