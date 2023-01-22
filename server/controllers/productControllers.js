const { Product } = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
    // const { name, slug, price, image, description } = req.body;
    console.log(req.file);
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: products,
        });
    }
});

module.exports = { addProduct, getAllProducts };
