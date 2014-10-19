var mongoose         = require("mongoose"),
    config           = require("./config"),
    authString       = config.db.user + (config.db.user.length > 0 ? ":" : "") + config.db.password,
    connectionString = "mongodb://" + authString + config.db.uri + ":" + config.db.port + "/" + config.db.name;

//connection string format: "mongodb://<user>:<password>uri:port/<name>"
mongoose.connect(connectionString);

mongoose.connection.on("error", function (err) {
    console.log("DB connection error:", err.message);
});

mongoose.connection.once("open", function () {
    console.log("Connected to DB!");
});

module.exports = mongoose.connection;
