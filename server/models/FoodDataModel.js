const mongoose = require("mongoose");

const foodDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    carb: {
        type: Number,
        required: true,
    },
    // auto calculated
    calories: {
        type: Number,
        required: true,
    },
});

// foodDataSchema.pre("save", function (next) {
//     this.calories = 4 * this.carb + 4 * this.protein + 9 * this.fat;
//     return next();
// });

const FoodData = mongoose.model("FoodData", foodDataSchema);
module.exports = { FoodData };
