var mongoose = require("mongoose"),
    crypto   = require("crypto");

var UserSchema = new mongoose.Schema({
        username : {
            type : String,
            unique : true,
            required : true
        },
        hashedPassword : {
            type : String,
            required : true
        },
        salt : {
            type : String,
            required : true
        },
        created : {
            type : Date,
        default:
            Date.now
        }
    });

UserSchema.virtual("userId").get(function () {
    return this.id;
});

UserSchema.virtual("password").get(function () {
    return this._plainPassword;
});

UserSchema.virtual("password").set(function (password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString("base64");
    //more secure - this.salt = crypto.randomBytes(128).toString("base64");
    this.hashedPassword = this.encryptPassword(password);
});

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model("User", UserSchema);
