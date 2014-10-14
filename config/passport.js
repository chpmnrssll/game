var localStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");
var User = require("../models/user");

module.exports = function(passport) {
    /*
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
    */
    
    // Passport Strategy for Login
    passport.use("login", new localStrategy({ passReqToCallback : true }, function(req, username, password, done) {
        User.findOne({ "username" :  username }, function(err, user) {
            if(err) { return done(err); }
            if(!user) { return done(null, false, { message: "Username not found." }); }
            if(!isValidPassword(user, password)) { return done(null, false, { message: "Invalid password." }); }
            return done(null, user, { message: "Authentication successful." });
        });
    }));
    
    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    
    // Passport Strategy for Registration
    passport.use("register", new localStrategy({ passReqToCallback : true }, function(req, username, password, done) {
        User.findOne({ "username" :  username }, function(err, user) {
            if(err) { return done(err); }
            if(user) { return done(null, false, { message: "Username already in use." }); }
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param("email");
            newUser.save(function(err) {
                if(err) { throw err; }
                return done(null, newUser, { message: "Registration succesful." });
            });
        });
    }));
    
    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}