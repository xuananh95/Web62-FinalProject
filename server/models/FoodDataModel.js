const mongoose = require("mongoose");

const foodDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    protein: {
        type: Number,
        max: 100,
        min: 0,
    },
    fat: {
        type: Number,
        max: 100,
        min: 0,
    },
    carb: {
        type: Number,
        max: 100,
        min: 0,
    },
    // auto calculated
    calories: {
        type: Number,
    },
});

foodDataSchema.pre("save", function (next) {
    this.calories = 4 * this.carb + 4 * this.protein + 9 * this.fat;
    return next();
});

const FoodData = mongoose.model("FoodData", foodDataSchema);
module.exports = { FoodData };
