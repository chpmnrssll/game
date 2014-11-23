var router      = require("express").Router(),
    oauth2      = require("../config/oauth2"),
    ClientModel = require("../models/client");

router.get("/client/:version", function (req, res, next) {
    ClientModel.findOne({
        version : req.params.version
    }, function (err, client) {
        if (err) {
            return next(err);
        }
        if (client) {
            return res.status(200).json({
                id : client.id,
                version : client.version,
                secret : client.secret
            });
        }
    });
});

router.post("/token", oauth2.token);

module.exports = router;
