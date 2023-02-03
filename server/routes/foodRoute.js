const express = require("express");

// controllers
const {
    addFoodData,
    getFoodDataList,
    getFoodDataById,
    updateFoodDataById,
    deleteFoodData,
} = require("../controllers/foodControllers");

// middlewares
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
    imageUploadLocal,
} = require("../middlewares/uploadImageToLocalMiddleware");

const router = express.Router();

/**
 *  1. Add Food data
    /foods/add-food-data: POST 
	+ desc: add new food ingredient data
	+ access: admin
	+ req.body: 
		{
            name: ,
            protein: ,
            fat: ,
            carb: ,
            image: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.post("/add-food-data", protect, addFoodData);

/**
 *  2. Get food data list
    /foods/: GET 
	+ desc: Get food data list
	+ access: none
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/", getFoodDataList);

/**
 *  3. Get food data by id
    /foods/: GET 
	+ desc: Get food data by id
	+ access: none
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/:id", getFoodDataById);

/**
 *  4. update food data by id
    /foods/:id: PUT 
	+ desc: update food data by id
	+ access: admin
	+ req.body: (all fields optional)
		{
            name: ,
            protein: ,
            fat: ,
            carb: ,
            image: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.put("/:id", protect, isAdmin, imageUploadLocal, updateFoodDataById);

/**
 *  5. Delete food data by id
    /foods/:id: PUT 
	+ desc: delete food data by id
	+ access: admin
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.delete("/:id", protect, isAdmin, deleteFoodData);

module.exports = router;
