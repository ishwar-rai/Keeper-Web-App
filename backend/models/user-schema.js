const mongoose = require("mongoose");
const passportLocaleMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

console.log("Models");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    notes: [{String, String}]
})

userSchema.plugin(passportLocaleMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model.User || mongoose.model('User', userSchema);