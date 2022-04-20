const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
        maxlength: 40,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema);

