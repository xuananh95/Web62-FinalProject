const { Product } = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const { cloudinaryUploadImage } = require("../utils/cloudinaryUploadImage");
const { isValidObjectId } = require("../utils/checkValidObjectId");

const addProduct = async (req, res) => {
    // console.log("req", req.body);
    try {
        // check if slug exists
        const isSlugExist = await Product.findOne({ slug: req.body.slug });
        if (isSlugExist) {
            return res.status(400).json({
                code: 400,
                message: "Slug already existed",
            });
        }

        const newProduct = await Product.create(req.body);
        return res.status(201).json({
            code: 201,
            message: "Created product success!",
            data: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            code: 500,
        });
    }
};

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

const findProductsBySlug = asyncHandler(async (req, res) => {
    const findSlug = req.params.slug;
    const result = await Product.find({
        slug: { $regex: `${findSlug}`, $options: "i" },
    });
    if (result.length > 0) {
        console.log("a");
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: result,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Not found",
            data: null,
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid id");
    } else {
        const product = await Product.findById(id);
        if (product) {
            try {
                const { name, slug, price, quantity, description } = req.body;
                // update name, price, description
                product.name = name || product.name;
                product.price = price || product.price;
                product.description = description || product.description;
                product.quantity = quantity || product.quantity;
                // check if slug exist in DB. If not, update the slug
                if (slug) {
                    const isSlugExist = await Product.find({ slug });
                    if (isSlugExist.length > 0) {
                        res.status(400);
                        throw new Error("Slug already existed");
                    } else {
                        product.slug = slug;
                    }
                }
                // Check if user send image
                const image = req.file;
                if (image) {
                    const imageUploaded = await cloudinaryUploadImage(
                        image.path,
                        FOLDER
                    );
                    product.image = imageUploaded.secure_url;
                }
                const updatedProduct = await product.save();

                res.status(200).json({
                    statusCode: 200,
                    message: "Success",
                    data: { updatedProduct },
                });
            } catch (error) {
                res.status(400);
                throw new Error("Invalid data");
            }
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid ID");
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error("Product not found!");
        } else {
            await product.remove();
            res.json({
                statusCode: 200,
                message: `Deleted product with id ${product._id}`,
                data: null,
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error("Invalid data");
    }
});

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    findProductsBySlug,
    deleteProduct,
};
