const { Order, Item } = require("../models/OrderModel");
const { User } = require("../models/UserModel");
const { Product } = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../utils/checkValidObjectId");
const ToObjectId = require("mongoose").Types.ObjectId;

const addOrder = asyncHandler(async (req, res) => {
    const userID = String(req.user._id);
    const { items, totalPrice, dateCreated, isPaid, shippingAddress } =
        req.body;
    const newOrder = await Order.create({
        totalPrice,
        dateCreated,
        isPaid,
        shippingAddress,
    });
    if (!isValidObjectId(userID)) {
        res.status(400);
        throw new Error("Invalid user ID");
    } else {
        const user = await User.findById(userID);
        newOrder.user = user;
    }
    for (let i = 0; i < items.length; i++) {
        const { product, qty } = items[i];
        if (!isValidObjectId(product)) {
            res.status(400);
            throw new Error("Invalid product ID");
        } else {
            const foundProduct = await Product.findById(product);
            try {
                const newItem = await Item.create({
                    product: foundProduct,
                    quantity: qty,
                });
                newOrder.items.push(newItem);
            } catch (error) {
                // console.log("product", error);
                res.status(400);
                throw new error("Error creating Item");
            }
        }
    }
    await newOrder.save();
    res.status(201).json({
        statusCode: 201,
        message: "New order created",
        data: newOrder,
    });
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate("user", "-password")
        .populate({
            path: "items",
            populate: { path: "product" },
        });
    if (orders.length > 0) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: orders,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Orders list empty",
            data: null,
        });
    }
});

const getOrdersByUser = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const orders = await Order.find({ user: userID })
        .populate("user", "-password")
        .populate({
            path: "items",
            populate: { path: "product" },
        });
    if (orders.length > 0) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: orders,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Orders list empty",
            data: null,
        });
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    let orderId;
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error("Invalid order id");
    } else {
        orderId = ToObjectId(req.params.id);
    }
    let orders;
    if (req.user.isAdmin) {
        orders = await Order.findById(orderId)
            .populate("user", "-password")
            .populate({
                path: "items",
                populate: { path: "product" },
            });
    } else {
        const userID = req.user._id;
        orders = await Order.find({ _id: orderId, user: userID })
            .populate("user", "-password")
            .populate({
                path: "items",
                populate: { path: "product" },
            });
    }
    if (orders.length > 0) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: orders,
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            message: "Orders list empty",
            data: null,
        });
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
        res.status(400);
        throw new Error("Invalid order ID!");
    }
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (order) {
        const { isPaid, shippingAddress } = req.body;
        order.isPaid = isPaid || order.isPaid;
        order.shippingAddress = shippingAddress || order.shippingAddress;
        const updatedOrder = await order.save();
        res.status(200).json({
            statusCode: 200,
            message: "Order updated successfully!",
            data: updatedOrder,
        });
    } else {
        res.status(404);
        throw new Error("Order not found!");
    }
});

const deleteOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
        res.status(400);
        throw new Error("Invalid order ID!");
    }
    const userId = req.user._id;
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (order) {
        await order.remove();
        res.json({
            statusCode: 200,
            message: `Deleted order with id ${order._id}`,
            data: null,
        });
    } else {
        res.status(404);
        throw new Error("Order not found!");
    }
});

module.exports = {
    addOrder,
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    deleteOrderById,
};
