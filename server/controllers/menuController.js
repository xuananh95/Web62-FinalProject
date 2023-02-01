const { Menu, Food } = require("../models/MenuModel");
const { FoodData } = require("../models/FoodDataModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../utils/checkValidObjectId");

const addMenu = asyncHandler(async (req, res) => {
    const user = req.user;
    const { foods } = req.body;
    try {
        const newMenu = await Menu.create({
            user,
            createdAt: Date.now(),
            foods: [],
        });
        for (let i = 0; i < foods.length; i++) {
            const { foodDataID, quantity } = foods[i];
            const foodData = await FoodData.findById(foodDataID);
            if (!foodData) {
                res.status(400);
                throw new Error("Invalid Food Data ID");
            } else {
                const food = await Food.create({
                    ingredient: foodData,
                    quantity: quantity,
                });
                newMenu.foods.push(food);
            }
        }
        await newMenu.save();
        res.status(201).json({
            statusCode: 201,
            message: "New menu created!",
            data: newMenu,
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const getMenuByUserID = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const menusByUser = await Menu.find({ user: userID }).populate({
        path: "foods",
        populate: {
            path: "ingredient",
        },
    });
    if (menusByUser.length > 0) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: menusByUser,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Menu not Found",
            data: null,
        });
    }
});

const getMenuByID = asyncHandler(async (req, res) => {
    const menuId = req.params.id;
    const userID = req.user._id;
    if (!isValidObjectId(menuId)) {
        res.status(400);
        throw new Error("Invalid Menu ID");
    }
    const menu = await Menu.findOne({ _id: menuId, user: userID }).populate({
        path: "foods",
        populate: {
            path: "ingredient",
        },
    });
    if (menu) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: menu,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Menu not Found",
            data: null,
        });
    }
});

const updateMenu = asyncHandler(async (req, res) => {
    const menuId = req.params.id;
    if (!isValidObjectId(menuId)) {
        res.status(400);
        throw new Error("Invalid Menu ID");
    }
    const menu = await Menu.findOne({ _id: menuId, user: userID }).populate({
        path: "foods",
        populate: {
            path: "ingredient",
        },
    });
    menu.foods = [];
    const { foods } = req.body;
    try {
        for (let i = 0; i < foods.length; i++) {
            const { foodDataID, quantity } = foods[i];
            const foodData = await FoodData.findById(foodDataID);
            if (!foodData) {
                res.status(400);
                throw new Error("Invalid Food Data ID");
            } else {
                const food = await Food.create({
                    ingredient: foodData,
                    quantity: quantity,
                });
                menu.foods.push(food);
            }
        }
        await newMenu.save();
        res.status(200).json({
            statusCode: 200,
            message: "Menu updated!",
            data: newMenu,
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid data");
    }
});

const deleteMenu = asyncHandler(async (req, res) => {
    const menuId = req.params.id;
    const userID = req.user._id;
    if (!isValidObjectId(menuId)) {
        res.status(400);
        throw new Error("Invalid Menu ID");
    }
    const menu = await Menu.findOne({ _id: menuId, user: userID }).populate({
        path: "foods",
        populate: {
            path: "ingredient",
        },
    });
    if (menu) {
        await menu.remove();
        res.status(200).json({
            statusCode: 200,
            message: "Successfully deleted menu",
            data: null,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Menu not Found",
            data: null,
        });
    }
});

module.exports = {
    addMenu,
    getMenuByUserID,
    getMenuByID,
    updateMenu,
    deleteMenu,
};
