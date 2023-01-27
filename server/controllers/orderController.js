const { Order, Item } = require("../models/OrderModel");
const { User } = require("../models/UserModel");
const { Product } = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../utils/checkValidObjectId");

const addOrder = asyncHandler(async (req, res) => {
    // items = array of product ID with its quantity
    const { userID, items, totalPrice, dateCreated, isPaid, shippingAddress } =
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
        const { productID, qty } = items[i];
        if (!isValidObjectId(productID)) {
            res.status(400);
            throw new Error("Invalid product ID");
        } else {
            const product = await Product.findById(productID);
            try {
                const newItem = await Item.create({
                    product: product,
                    quantity: qty,
                });
                newOrder.items.push(newItem);
            } catch (error) {
                console.log("product", error);
            }
        }
    }
    await newOrder.save();
    res.status(200).json({
        statusCode: 200,
        message: "Success",
        data: newOrder,
    });
});

module.exports = { addOrder };
