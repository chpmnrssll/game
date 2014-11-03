var mongoose = require("mongoose"),
    crypto   = require("crypto"),
    config   = require("../config/config");

var AccessTokenSchema = new mongoose.Schema({
        user : {
            required : true,
            type : String
        },
        client : {
            required : true,
            type : String
        },
        value : {
            type : String,
            unique : true
        },
        created : {
            default : Date.now,
            type : Date
        }
    });

AccessTokenSchema.pre("save", function (next) {
    this.value = crypto.randomBytes(32).toString("base64");
    next();
});

AccessTokenSchema.methods.expired = function () {
    return Math.round((Date.now() - this.created) / 1000) > config.security.tokenLife;
}

module.exports = mongoose.model("AccessToken", AccessTokenSchema);
