const mongoose = require("mongoose");
const exerciseSchema = require("./ExerciseModel").exerciseSchema;

const fitnessDiarySchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    day: {
        type: Date,
    },
    menus: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Menu",
        },
    ],
    exercises: [exerciseSchema],
    caloriesIn: {
        type: Number,
    },
    caloriesOut: {
        type: Number,
    },
});

const FitnessDiary = mongoose.model("FitnessDiary", fitnessDiarySchema);
module.exports = { FitnessDiary };
