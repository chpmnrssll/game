var router    = require("express").Router(),
    passport  = require("passport"),
    UserModel = require("../models/user");

// register
router.post("/", function (req, res, next) {
    var username = req.body["username"],
        password = req.body["password"];

    UserModel.findOne({
        name : username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return res.status(422).json({
                message : "Username already taken."
            }); //401?
        }
        new UserModel({
            name : username,
            password : password
        }).save(function (err, user) {
            if (err) {
                return console.log(err);
            }
            return res.status(201).json(user);
        });
    });
});

// get one
//router.get("/:id", passport.authenticate("accessToken", { session : false }),
router.get("/:id", function (req, res, next) {
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

// get all
//router.get("/", passport.authenticate("accessToken", { session : false }),
router.get("/", function (req, res, next) {
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

// update
//router.put("/:id", passport.authenticate("accessToken", { session : false }),
router.put("/:id", function (req, res, next) {
    UserModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message : "Unknown user"
            });
        }
        //return res.status(200).json(user);
        return res.status(200).json({ message : "User updated." });
    });
});

//router.delete("/:id", passport.authenticate("accessToken", { session : false }),
router.delete("/:id", function (req, res, next) {
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
