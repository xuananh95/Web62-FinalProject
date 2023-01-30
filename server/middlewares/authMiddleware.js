const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Check jwt
const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Checking if request contains Bearer authorization header
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const userVerify = jwt.verify(token, SECRET_KEY);
            const userInfo = await User.findById(userVerify._id).select(
                "-password"
            );
            req.user = userInfo;
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Invalid token");
        }
    } else {
        res.status(401);
        throw new Error("No token or token invalid");
    }
});

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        res.status(401);
        throw new Error("Unauthorized");
    }
};

module.exports = { protect, isAdmin };
