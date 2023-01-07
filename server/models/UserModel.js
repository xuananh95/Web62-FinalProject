const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "NORMAL", "PREMIUM"],
    },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
