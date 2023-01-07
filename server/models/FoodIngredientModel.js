const mongoose = require("mongoose");

const foodIngredientSchema = mongoose.Schema({
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
    calories: {
        type: Number,
    },
});

const FoodIngredient = mongoose.model("FoodIngredient", foodIngredientSchema);
module.exports = { FoodIngredient };
