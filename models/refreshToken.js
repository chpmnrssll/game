var mongoose = require("mongoose"),
    crypto   = require("crypto");

var RefreshTokenSchema = new mongoose.Schema({
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

RefreshTokenSchema.pre("save", function (next) {
    this.value = crypto.randomBytes(32).toString("base64");
    next();
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
