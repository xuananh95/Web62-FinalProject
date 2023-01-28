const { FoodData } = require("../models/FoodDataModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../utils/checkValidObjectId");
const { cloudinaryUploadImage } = require("../utils/cloudinaryUploadImage");

const FOLDER = "food";

const addFoodData = asyncHandler(async (req, res) => {
    const { name, protein, fat, carb } = req.body;
    const image = req.file;
    console.log(name, protein, fat, carb);
    if (!name || !protein || !fat || !carb || !image) {
        res.status(400);
        throw new Error("Missing required fields!");
    }
    try {
        const imageUploaded = await cloudinaryUploadImage(image.path, FOLDER);
        const imageURL = imageUploaded.secure_url;
        const newFoodData = await FoodData.create({
            name,
            image: imageURL,
            protein,
            fat,
            carb,
        });
        if (newFoodData) {
            res.status(200).json({
                statusCode: 200,
                message: "New food added!",
                data: {
                    name,
                    protein,
                    fat,
                    carb,
                    imageURL,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error("Invalid data!");
    }
});

const getFoodDataList = asyncHandler(async (req, res) => {
    const foods = await FoodData.find({});
    res.status(200).json({
        statusCode: 200,
        message: "Success!",
        data: foods,
    });
});

const updateFoodDataById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid ID");
    }
    const food = await FoodData.findById(id);
    if (food) {
        try {
            const { name, protein, fat, carb } = req.body;
            const image = req.file;
            food.name = name || food.name;
            food.protein = protein || food.protein;
            food.fat = fat || food.fat;
            food.carb = carb || food.carb;
            if (image) {
                const imageUploaded = await cloudinaryUploadImage(
                    image.path,
                    FOLDER
                );
                food.image = imageUploaded.secure_url;
            }
            const updatedFood = await food.save();
            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: {
                    name: updatedFood.name,
                    protein: updatedFood.protein,
                    fat: updatedFood.fat,
                    carb: updatedFood.carb,
                    image: updatedFood.image,
                },
            });
        } catch (error) {
            res.status(400);
            throw new Error("Invalid data");
        }
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const deleteFoodData = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        res.status(400);
        throw new Error("Invalid ID");
    }
    try {
        const food = await FoodData.findById(id);
        if (!food) {
            res.status(404);
            throw new Error("Food not found!");
        } else {
            await food.remove();
            res.json({
                statusCode: 200,
                message: `Deleted food with id ${food._id}`,
                data: null,
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error("Invalid data");
    }
});

module.exports = {
    addFoodData,
    getFoodDataList,
    updateFoodDataById,
    deleteFoodData,
};
