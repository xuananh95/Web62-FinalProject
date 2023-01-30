const express = require("express");

const {
    addProfile,
    updateMeasure,
    getProfile,
    deleteProfile,
    deleteMeasureRecord,
} = require("../controllers/fitnessProfileControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 *  1. Create Profile
    /fitness-profile/add-profile: POST 
	+ desc: Create Profile
	+ access: user
	+ req.body: (user id from jwt token; measure date set to Date.now())
		{
            "gender": "FEMALE",
            "measure": {
                "height": 172,
                "weight": 70,
                "chest": 90,
                "waist": 75,
                "hip": 96,
                "arm": 35,
                "thigh": 50,
                "fatPercent": 12
            },
            "TDEE": 2322,
            "BMR": 2000
        }
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.post("/add-profile", protect, addProfile);

/**
 *  2. Adding new measure to the Profile
    /fitness-profile/update-measure: POST 
	+ desc: Adding new measure to the Profile
	+ access: user
	+ req.body: (user id from jwt token)
		{
            "height": 173,
            "weight": 72,
            "chest": 92,
            "waist": 77,
            "hip": 93,
            "arm": 38,
            "thigh": 52,
            "fatPercent": 11
        }
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.post("/update-measure", protect, updateMeasure);

/**
 *  3. Get profile
    /fitness-profile/: GET 
	+ desc: Return the fitness profile, populated with User and Measure model
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/", protect, getProfile);

/**
 *  4. Delete profile
    /fitness-profile/: DEL 
	+ desc: Delete profile
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.delete("/", protect, deleteProfile);

/**
 *  5. Delete one measure record from profile based on ID
    /fitness-profile/:id: DEL 
	+ desc: Delete profile
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.delete("/:id", protect, deleteMeasureRecord);

module.exports = router;
