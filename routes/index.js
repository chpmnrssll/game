module.exports = function (app) {
    /*
    app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
    });

    app.get("/ErrorExample", function (req, res, next) {
        next(new Error("Random error!"));
    });
    */

    app.use("/users", require("../routes/users"));
    app.use("/oauth2", require("../routes/oauth2"));
};
