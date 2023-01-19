const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "NORMAL", "PREMIUM"],
        default: "NORMAL",
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
