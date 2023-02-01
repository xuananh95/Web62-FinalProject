const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    ingredient: {
        type: mongoose.Types.ObjectId,
        ref: "FoodData",
    },
    quantity: {
        type: Number,
        min: 0,
    },
});
const Food = mongoose.model("Food", foodSchema);

const menuSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
    },
    foods: [{ type: mongoose.Types.ObjectId, ref: "Food" }],
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = {
    Menu,
    Food,
};
