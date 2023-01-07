const mongoose = require("mongoose");
const mealSchema = require("./MealModel").mealSchema;
const exerciseSchema = require("./ExerciseModel").exerciseSchema;

const fitnessDiarySchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    day: {
        type: Date,
    },
    meals: [mealSchema],
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
