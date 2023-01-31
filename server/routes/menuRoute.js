const express = require("express");

const {
    addMenu,
    getMenuByUserID,
    getMenuByID,
    updateMenu,
    deleteMenu,
} = require("../controllers/menuController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 *  1. Add menu
    /menu/add-menu: POST 
	+ desc: add new menu
	+ access: user
	+ req.body: 
		{
            "foods": [
                {
                    "foodDataID": "63d8c6f3400d5c0507094c32",
                    "quantity": 100
                },
                {
                    "foodDataID": "63d8c715400d5c0507094c35",
                    "quantity": 200
                }
            ]
        }
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.post("/add-menu", protect, addMenu);

/**
 *  2. Get all menus created by this user
    /menu/: GET 
	+ desc: Get all menus created by this user
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/", protect, getMenuByUserID);

/**
 *  3. Get one menu by ID ( created by this user)
    /menu/: GET 
	+ desc: Get one menu by ID ( created by this user)
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.get("/:id", protect, getMenuByID);

/**
 *  4. Update menu by ID ( created by this user)
    /menu/: PUT 
	+ desc: Update menu by ID ( created by this user)
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.put("/:id", protect, updateMenu);

/**
 *  5. Delete menu by ID ( created by this user)
    /menu/: DEL 
	+ desc: Delete menu by ID ( created by this user)
	+ access: user
	+ return values: 
        {
            statusCode:
            message:
            data: 
        }
 */
router.delete("/:id", protect, deleteMenu);

module.exports = router;
