require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

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

// handling errors
app.use(errorHandle);

// start the server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
