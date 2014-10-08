var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, localStrategy, User) {
    passport.use("login", new localStrategy({ passReqToCallback : true }, function(req, username, password, done) {
        User.findOne({ "username" :  username }, function(err, user) {
            if(err) { return done(err); }
            if(!user) {
                console.log("User Not Found with username " + username);
                //return done(null, false, req.flash("message", "User Not found."));
                return done(null, false, { message: "User Not found." });
            }
            if(!isValidPassword(user, password)) {
                console.log("Invalid Password");
                //return done(null, false, req.flash("message", "Invalid Password"));
                return done(null, false, { message: "Invalid Password" });
            }
            
            return done(null, user);
        });
    }));
    
    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}