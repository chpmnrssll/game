var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, localStrategy, User) {
    passport.use("register", new localStrategy({ passReqToCallback : true }, function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({ "username" :  username }, function(err, user) {
                if(err) {
                    console.log("Error in SignUp: " + err);
                    return done(err);
                }
                if(user) {
                    console.log("User already exists with username: " + username);
                    //return done(null, false, req.flash("message", "User Already Exists"));
                    return done(null, false, { message: "User Already Exists" });
                } else {
                    var newUser = new User();
                    
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param("email");
                    newUser.save(function(err) {
                        if(err) {
                            console.log("Error in Saving user: " + err);
                            throw err;
                        }
                        console.log("User Registration succesful");
                        return done(null, newUser);
                    });
                }
            });
        }
        
        // Delay the execution of findOrCreateUser and execute the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
    
    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}