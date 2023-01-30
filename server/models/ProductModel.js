const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
});

const Product = mongoose.model("Product", productSchema);
module.exports = {
    Product,
    productSchema,
};
