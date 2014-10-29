var mongoose = require("mongoose");

var ClientSchema = new mongoose.Schema({
        version : {
            required : true,
            type : String,
            unique : true
        },
        secret : {
            required : true,
            type : String
        }
    });

module.exports = mongoose.model("Client", ClientSchema);
