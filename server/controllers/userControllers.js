const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const { serialize } = require("cookie");

const RefreshTokenModel = require("../models/RefreshTokenModel");
const { User } = require("../models/UserModel");
const { signJWt, refreshToken } = require("../utils/jwt");

const signUp = asyncHandler(async (req, res) => {
    const { username, email, password, phone: phoneNumber, address } = req.body;
    if (!username || !email || !password || !phoneNumber || !address) {
        res.status(400);
        throw new Error("Missing required fields!");
    }

    // Count the number of documents in User collection. If 0 => create ADMIN user
    const documentsCount = await User.estimatedDocumentCount();
    if (documentsCount === 0) {
        try {
            const adminUser = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                role: "ADMIN",
            });
            if (adminUser) {
                res.status(200).json({
                    statusCode: 200,
                    message: "User created",
                    data: {
                        username,
                        email,
                    },
                });
            }
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            res.status(400);
            throw new Error("Email already registered");
        } else {
            try {
                const newUser = await User.create({
                    username,
                    email,
                    password,
                    phoneNumber,
                    address,
                });
                if (newUser) {
                    res.status(200).json({
                        statusCode: 200,
                        message: "User created",
                        data: {
                            username,
                            email,
                        },
                    });
                }
            } catch (error) {
                res.status(400);
                throw new Error(error);
            }
        }
    }
});

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Missing required fields!");
    } else {
        const user = await User.findOne({ email });
        if (user && (await bcryptjs.compare(password, user.password))) {
            const payload = {
                _id: user._id,
                role: user.role,
            };

            //create refresh token

            const refreshtoken = await refreshToken(payload);

            const existedRefreshToken = await RefreshTokenModel.findOne({
                userId: user._id,
            });

            if (existedRefreshToken) {
                await RefreshTokenModel.findOneAndUpdate(
                    existedRefreshToken._id,
                    {
                        refreshtoken,
                    }
                );
            }

            if (!existedRefreshToken) {
                await RefreshTokenModel.create({
                    userId: user._id,
                    refreshtoken,
                });
            }

            res.setHeader(
                "Set-Cookie",
                serialize(
                    "refreshToken",
                    existedRefreshToken?.refreshtoken || refreshtoken,
                    {
                        httpOnly: true,
                        sameSite: "Strict",
                        path: "/",
                        secure: false,
                        maxAge: 365 * 24 * 60 * 60,
                    }
                )
            );

            const { password, ...other } = user._doc;
            res.status(200).json({
                statusCode: 200,
                message: "Login success!",
                data: {
                    accessToken: signJWt(payload),
                    other,
                },
            });
        } else {
            res.status(400);
            throw new Error("Incorrect username or password!");
        }
    }
});

const getUserByID = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const userById = await User.findById(id).select("-password");
        if (!userById) {
            res.status(404);
            throw new Error("User not found!");
        } else {
            res.status(200).json({
                statusCode: 200,
                message: "User found!",
                data: userById,
            });
        }
    } catch (error) {
        res.status(400);
        // catch error when id is not a valid mongoose ObjectID
        throw new Error("Invalid data");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const { username, address, phoneNumber } = req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    if (user) {
        user.username = username || user.username;
        user.address = address || user.address;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        const updatedUser = await user.save();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                address: updatedUser.address,
                phoneNumber: updatedUser.phoneNumber,
            },
        });
    } else {
        res.status(401);
        throw new Error("User not found!");
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.user._id;
    const user = await User.findById(id);
    if (user && (await bcryptjs.compare(oldPassword, user.password))) {
        user.password = newPassword;
        const updatedPwd = await user.save();
        res.status(200).json({
            statusCode: 200,
            message: "Password changed Successfully",
            data: null,
        });
    } else {
        res.status(400);
        throw new Error("Invalid password");
    }
});

const changeRole = asyncHandler(async (req, res) => {
    const { id, newRole } = req.body;
    if (!id || !newRole) {
        res.status(400);
        throw new Error("Missing required fields");
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error("User not found!");
        } else {
            user.role = newRole;
            const updatedRole = await user.save();
            res.status(200).json({
                statusCode: 200,
                message: "User role updated!",
                data: null,
            });
        }
    } catch (error) {
        res.status(400);
        // catch error when id is not a valid mongoose ObjectID
        throw new Error("Invalid data");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const userList = await User.find({}).select("-password");
    if (userList) {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: userList,
        });
    } else {
        res.status(400).json({
            statusCode: 400,
            message: "Failed",
            data: null,
        });
    }
});

const deleteUserByID = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error("User not found!");
        } else {
            await user.remove();
            res.json({
                statusCode: 200,
                message: `Deleted user with id ${user._id}`,
                data: null,
            });
        }
    } catch (err) {
        res.status(400);
        throw new Error("Invalid data");
    }
});

module.exports = {
    signUp,
    signIn,
    getUserByID,
    updateUser,
    changePassword,
    changeRole,
    getAllUsers,
    deleteUserByID,
};
