const { FitnessProfile, Measure } = require("../models/FitnessProfileModel");
const { User } = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../utils/checkValidObjectId");

const addProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const userProfile = await FitnessProfile.findOne({ user: user._id });
    if (userProfile) {
        res.status(400);
        throw new Error("Profile of this user already exists!");
    }
    const newProfile = new FitnessProfile();
    const { gender, measure, TDEE, BMR } = req.body;
    const { height, weight, chest, waist, hip, arm, thigh, fatPercent } =
        measure;
    if (
        !gender ||
        !TDEE ||
        !BMR ||
        !height ||
        !weight ||
        !chest ||
        !waist ||
        !hip ||
        !arm ||
        !thigh ||
        !fatPercent
    ) {
        res.status(400);
        throw new Error("Missing required fields!");
    }
    newProfile.user = user;
    newProfile.gender = gender;
    newProfile.TDEE = TDEE;
    newProfile.BMR = BMR;
    try {
        const userMeasure = await Measure.create({
            day: Date.now(),
            height,
            weight,
            chest,
            waist,
            hip,
            arm,
            thigh,
            fatPercent,
        });
        newProfile.measure.push(userMeasure);
        try {
            newProfile.save();
            res.status(201).json({
                statusCode: 201,
                message: "New profile added",
                data: newProfile,
            });
        } catch (error) {
            res.status(400);
            throw new Error("Invalid Profile data");
        }
    } catch (error) {
        // console.log(error);
        res.status(400);
        throw new Error("Invalid measure data");
    }
});

const updateMeasure = asyncHandler(async (req, res) => {
    const user = req.user;
    const userProfile = await FitnessProfile.findOne({ user: user._id });
    if (userProfile) {
        const { height, weight, chest, waist, hip, arm, thigh, fatPercent } =
            req.body;
        if (
            !height ||
            !weight ||
            !chest ||
            !waist ||
            !hip ||
            !arm ||
            !thigh ||
            !fatPercent
        ) {
            res.status(400);
            throw new Error("Missing required fields!");
        }
        try {
            const userMeasure = await Measure.create({
                day: Date.now(),
                height,
                weight,
                chest,
                waist,
                hip,
                arm,
                thigh,
                fatPercent,
            });
            userProfile.measure.push(userMeasure);
            await userProfile.save();
            res.status(200).json({
                statusCode: 200,
                message: "New measure added",
                data: userProfile,
            });
        } catch (error) {
            // console.log(error);
            res.status(400);
            throw new Error("Invalid measure data");
        }
    } else {
        res.status(404);
        throw new Error("Profile not found! Please create profile first!");
    }
});

const getProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const userProfile = await FitnessProfile.findOne({
        user: user._id,
    }).populate("user measure");
    if (!userProfile) {
        res.status(404);
        throw new Error("User profile not found!");
    } else {
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: userProfile,
        });
    }
});

const deleteProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    const userProfile = await FitnessProfile.findOne({
        user: user._id,
    }).populate("user measure");
    if (!userProfile) {
        res.status(404);
        throw new Error("User profile not found!");
    } else {
        await userProfile.remove();
        res.status(200).json({
            statusCode: 200,
            message: "Successfully deleted user profile",
            data: null,
        });
    }
});

const deleteMeasureRecord = asyncHandler(async (req, res) => {
    const user = req.user;
    const measureRecordId = req.params.id;
    if (!isValidObjectId(measureRecordId)) {
        res.status(400);
        throw new Error("Invalid measure record id");
    }
    const userProfile = await FitnessProfile.findOne({
        user: user._id,
    }).populate("user measure");
    if (!userProfile) {
        res.status(404);
        throw new Error("User profile not found!");
    } else {
        const deleteMeasure = await Measure.findById(measureRecordId);
        if (!deleteMeasure) {
            res.status(404);
            throw new Error("Measure record not found");
        } else {
            await deleteMeasure.remove();
            try {
                const newArr = userProfile.measure.map((e) => e._id.toString());
                const index = newArr.indexOf(measureRecordId);
                if (index > -1) {
                    userProfile.measure.splice(index, 1);
                }
                userProfile.save();
            } catch (error) {
                // console.log(error);
                res.status(400);
                throw new Error("Error deleting measure");
            }
            res.status(200).json({
                statusCode: 200,
                message: "Successfully deleted user measure record",
                data: userProfile,
            });
        }
    }
});

module.exports = {
    addProfile,
    updateMeasure,
    getProfile,
    deleteProfile,
    deleteMeasureRecord,
};
