var User = require("../models/user");

module.exports = function(passport, localStrategy) {
    passport.serializeUser(function(user, done) {
        console.log("serializing user: ", user);
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log("deserializing user:", user);
            done(err, user);
        });
    });
    
    // Setting up Passport Strategies for Login and Registration
    require("./login")(passport, localStrategy, User);
    require("./register")(passport, localStrategy, User);
}