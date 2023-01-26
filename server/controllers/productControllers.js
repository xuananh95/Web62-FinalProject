const { Product } = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImage } = require("../utils/cloudinaryUploadImage");

const addProduct = asyncHandler(async (req, res) => {
    const { name, slug, price, description } = req.body;
    const image = req.file;
    if (!name || !slug || !price || !image) {
        res.status(400);
        throw new Error("Missing required fields!");
    }

    // upload image to cloudinary
    const imageUploaded = await cloudinaryUploadImage(image.path);
    const imageURL = imageUploaded.secure_url;

    try {
        const newProduct = await Product.create({
            name,
            slug,
            price,
            image: imageURL,
            description,
        });
        if (newProduct) {
            res.status(200).json({
                statusCode: 200,
                message: "New product added!",
                data: {
                    name,
                    slug,
                    price,
                    imageURL,
                    description,
                },
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error("Invalid data!");
    }
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

const updateProduct = asyncHandler(async (req, res) => {});

module.exports = { addProduct, getAllProducts, updateProduct };
