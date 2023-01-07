const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        min: 0,
    },
});

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    items: [itemSchema],
    totalPrice: {
        type: Number,
    },
    dateCreated: {
        type: Date,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = {
    Order,
    orderSchema,
};
