require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const multer = require("multer");
const { unlink } = require("fs");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
    cloud_name: process.env.API_CLOUD_NAME_CLOUDINARY,
    secure: true,
});

const { protect, isAdmin } = require("./middlewares/authMiddleware");
const {
    imageUploadLocal,
} = require("./middlewares/uploadImageToLocalMiddleware");

const connectToDB = require("./config/db");

// import routers
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const foodRouter = require("./routes/foodRoute");
const orderRouter = require("./routes/orderRoute");

// import middlewares
const { errorHandle } = require("./middlewares/errorMiddleware");

// basic setup
const PORT = 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectToDB();

// routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);

app.post(
    "/tools/uploadImage",
    protect,
    isAdmin,
    imageUploadLocal,
    async (req, res) => {
        let image = req.file;
        const imageUploaded = await cloudinaryUploadImage(
            image.path,
            "product"
        );
        const imageURL = imageUploaded.secure_url;
        res.json(imageURL);
    }
);

// handling errors
app.use(errorHandle);

// start the server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
