const express = require("express");

// controllers
const {
    addProduct,
    getAllProducts,
    updateProduct,
} = require("../controllers/productControllers");

// middlewares
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
    imageUploadLocal,
} = require("../middlewares/uploadImageToLocalMiddleware");

const router = express.Router();

router.post("/add-product", protect, isAdmin, imageUploadLocal, addProduct);
router.get("/", getAllProducts);
router.put("/:slug", protect, isAdmin, imageUploadLocal, updateProduct);

module.exports = router;
