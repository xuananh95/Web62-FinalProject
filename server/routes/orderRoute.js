const express = require("express");

const {
    addOrder,
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    deleteOrderById,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * 1. Add order
    /orders/add-order: POST 
	+ desc: add new order
	+ access: user
    + req.body: 
        {
            "items": [
                {
                    "product": "63d4dec6867cb1a3eef2cc3e",
                    "qty": 2
                }
            ],
            "totalPrice": 123,
            "dateCreated": "12/12/2022",
            "isPaid": false,
            "shippingAddress": "Hanoi"
        }
    + return values: 
        {
            statusCode:
            message:
            data: newOrder
        }
 */
router.post("/add-order", protect, addOrder);

/**
 * 2. Get all order
    /orders/all: GET 
	+ desc: get all orders of all users
	+ access: admin
    + return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/all", protect, isAdmin, getAllOrders);

/**
 * 3. Get all orders made by the logged in user
    /orders/: GET 
	+ desc: get all orders made by the logged in user
	+ access: user
    + return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/", protect, getOrdersByUser);

/**
 * 3. Get order by ID
    /orders/: GET 
	+ desc: Get order by ID
	+ access: normal user => get order made by this user only
              admin => get order made by all users by id
    + return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrderById);

module.exports = router;
