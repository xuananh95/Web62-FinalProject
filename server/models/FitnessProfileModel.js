const mongoose = require("mongoose");

const measureSchema = mongoose.Schema({
    chest: {
        type: Number,
    },
    waist: {
        type: Number,
    },
    hip: {
        type: Number,
    },
    arm: {
        type: Number,
    },
    thigh: {
        type: Number,
    },
});

const fitnessProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        default: "MALE",
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    measure: {
        type: measureSchema,
    },
    TDEE: {
        type: Number,
    },
    BMR: {
        type: Number,
    },
    fatPercent: {
        type: Number,
    },
});

const FitnessProfile = mongoose.model("FitnessProfile", fitnessProfileSchema);
module.exports = { FitnessProfile };
