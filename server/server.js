require("dotenv").config();

const express = require("express");

const connectToDB = require("./config/db");
connectToDB();

const userRouter = require("./routes/userRoute");

const { errorHandle } = require("./middlewares/errorMiddleware");

// basic setup
const PORT = 5000;
const app = express();
app.use(express.json());

// routes
app.use("/users", userRouter);

// handling errors
app.use(errorHandle);

// start the server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
