const express = require("express");

// controllers
const {
    addProduct,
    getAllProducts,
} = require("../controllers/productControllers");

// middlewares
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
    imageUploadLocal,
} = require("../middlewares/uploadImageToLocalMiddleware");

const router = express.Router();

router.post("/add-product", protect, isAdmin, imageUploadLocal, addProduct);
router.get("/", getAllProducts);

module.exports = router;
