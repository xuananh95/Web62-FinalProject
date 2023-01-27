const express = require("express");

const { addOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/add-order", addOrder);

module.exports = router;
