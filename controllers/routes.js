module.exports = function(app) {
    app.get("/", function(req, res) {
        res.type("text/html");
        res.send("Hello World!!!");
    });
};