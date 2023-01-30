const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    caloriesBurned: {
        type: Number,
        min: 0,
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = {
    Exercise,
    exerciseSchema,
};
