const express = require("express");

const router = express.Router();

const {
    addProduct,
    getAllProducts,
} = require("../controllers/productControllers");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

router.post("/add-product", protect, isAdmin, addProduct);
router.get("/", getAllProducts);

module.exports = router;
