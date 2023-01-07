const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    ingredient: {
        type: mongoose.Types.ObjectId,
        ref: "FoodIngredient",
    },
    quantity: {
        type: Number,
        min: 0,
    },
});

const mealSchema = mongoose.Schema({
    createdAt: {
        type: Date,
    },
    foods: [foodSchema],
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = {
    Meal,
    mealSchema,
};
