require("dotenv").config();

const express = require("express");

const connectToDB = require("./config/db");
connectToDB();

const PORT = 5000;
const app = express();
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
