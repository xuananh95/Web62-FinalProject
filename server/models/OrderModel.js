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

const Item = mongoose.model("Item", itemSchema);

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Item",
        },
    ],
    totalPrice: {
        type: Number,
    },
    dateCreated: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    shippingAddress: {
        type: String,
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = {
    Order,
    Item,
};
