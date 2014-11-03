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
                this.generateSalt();
                return this.encryptPassword(password);
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

UserSchema.methods.generateSalt = function () {
    this.salt = crypto.randomBytes(32).toString("base64");
}

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
}

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.password;
}

module.exports = mongoose.model("User", UserSchema);
