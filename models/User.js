var mongoose = require("mongoose");
var passportLocaltMongoose = require("passport-local-mongoose");

var UserSchema =new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocaltMongoose);

module.exports = mongoose.model("User",UserSchema);