var router    = require("express").Router(),
    passport  = require("passport"),
    UserModel = require("../models/user");

// create (register)
router.post("/", function (req, res, next) {
    UserModel.findOne({
        name : req.body.username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return res.status(401).json({
                message : "Username already taken."
            });
        }
        new UserModel({
            email : req.body.email,
            name : req.body.username,
            password : req.body.password
        }).save(function (err, user) {
            if (err) {
                return console.log(err);
            }
            return res.status(201).json(user);
        });
    });
});

// read (one)
router.get("/:id", passport.authenticate("accessToken", { session : false }), function (req, res, next) {
//router.get("/:id", function (req, res, next) {
    UserModel.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message : "Unknown user"
            });
        }
        return res.status(200).json(user);
    });
});

// read (all)
router.get("/", passport.authenticate("accessToken", { session : false }), function (req, res, next) {
//router.get("/", function (req, res, next) {
    UserModel.find({}, function (err, users) {
        if (err) {
            return next(err);
        }
        if (!users) {
            return next(null, false, {
                message : "All users missing!"
            });
        }
        return res.status(200).json(users);
    });
});

// update (one)
router.put("/:id", passport.authenticate("accessToken", { session : false }), function (req, res, next) {
    UserModel.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message : "Unknown user"
            });
        }
        
        user.name = req.body.name;
        //user.password = req.body.password;
        user.save(function (err) {
            return res.status(200).json({ message : "User updated." });
        });
    });
});

// delete (one)
router.delete("/:id", passport.authenticate("accessToken", { session : false }), function (req, res, next) {
//router.delete("/:id", function (req, res, next) {
    UserModel.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message : "Unknown user"
            });
        }
        return res.status(200).json({ message : "User deleted." });
    });
});

module.exports = router;
