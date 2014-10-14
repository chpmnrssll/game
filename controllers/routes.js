module.exports = function(app, passport) {
    /*
    app.get("*", function(req, res) {
        res.sendFile("./public/index.html"); // load the single view file (backbone will handle the page changes on the front-end)
    });
    */
    app.post("/login", function(req, res, next) {
        passport.authenticate("login", { session: false }, function(err, user, info) {
            if(err) { return next(err); }
            if(!user) { return res.status(401).json(info); }
            return res.status(200).json(info);
        })(req, res, next);
    });
    
    app.post("/register", function(req, res, next) {
        passport.authenticate("register", { session: false }, function(err, user, info) {
            if(err) { return next(err); }
            if(!user) { return res.status(401).json(info); }
            return res.status(200).json(info);
        })(req, res, next);
    });
}