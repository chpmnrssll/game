var mongoose = require("mongoose"),
    crypto   = require("crypto");

var UserSchema = new mongoose.Schema({
        name : {
            lowercase : true,
            required : true,
            type : String,
            unique : true
        },
        password : {
            required : true,
            set : function (password) {
                this.salt = crypto.randomBytes(32).toString("base64");
                return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
            },
            type : String
        },
        salt : {
            required : true,
            type : String
        },
        created : {
            default: Date.now,
            type : Date
        }
    });

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.password;
}

UserSchema.methods.encryptPassword = function (password) {
    this.salt = crypto.randomBytes(32).toString("base64");
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
}

module.exports = mongoose.model("User", UserSchema);
