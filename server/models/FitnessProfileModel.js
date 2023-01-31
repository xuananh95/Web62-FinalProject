const mongoose = require("mongoose");

const measureSchema = mongoose.Schema({
    day: {
        type: Date,
        required: true,
    },
    height: {
        type: Number,
        required: true,
        min: 0,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    chest: {
        type: Number,
        required: true,
        min: 0,
    },
    waist: {
        type: Number,
        required: true,
        min: 0,
    },
    hip: {
        type: Number,
        required: true,
        min: 0,
    },
    arm: {
        type: Number,
        required: true,
        min: 0,
    },
    thigh: {
        type: Number,
        required: true,
        min: 0,
    },
    fatPercent: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
});

const Measure = mongoose.model("Measure", measureSchema);

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
    measure: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Measure",
        },
    ],
    TDEE: {
        type: Number,
    },
    BMR: {
        type: Number,
    },
});

const FitnessProfile = mongoose.model("FitnessProfile", fitnessProfileSchema);

module.exports = { FitnessProfile, Measure };
