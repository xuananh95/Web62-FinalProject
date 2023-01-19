const express = require("express");
const router = express.Router();

const {
    signUp,
    signIn,
    getUserByID,
    updateUser,
    changePassword,
    changeRole,
    getAllUsers,
    deleteUserByID,
} = require("../controllers/userControllers");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

/**
 *  1. register
    /users/register: POST 
	+ desc: register new users
	+ access: none
	+ req.body: 
		{
            username: ,
            password: ,
            email: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: created user (id + username + email) (null if errors occurs)
        }
 */
router.post("/sign-up", signUp);

/**
 *  2. Login
 *  /users/login: POST
    + desc: log user in
    + access: none
    + req.body: 
        {
            username: ,
            password: ,
        }
    + returned values:
        {
            statusCode:
            message:
            data: JWT-token (null if errors occurs)
        }
 */
router.post("/sign-in", signIn);

/**
 *  3. get User by ID
    /users/login: POST
    + desc: log user in
    + access: none
    + req.body: 
        {
            username: ,
            password: ,
        }
    + returned values:
        {
            statusCode:
            message:
            data: JWT-token (null if errors occurs)
        }
 */
router.get("/:id", protect, getUserByID);

/**
    4. Update user information
    /users: PUT
    + desc: updated user's information (except username + password + role)
    + access: require JWT (this user)
    + req.body: 
        {
            email: ,
            address: ,
            phoneNumber: ,
        }
    + return values: 
        {
            statusCode:
            message:
            data: updated user (all fields except password) (null if errors occurs)
        } 
 */
router.put("/", protect, updateUser);

/**
    5. Change password
    /users/changePassword: PUT
    + desc: change user password
    + access: require JWT (this user)
    + req.body:
        {
            oldPassword: ,
            newPassword: ,
        }
    + return values:
        { 
            statusCode: ,
            message: (success/error message),
            data: null
        }
 */
router.put("/changePassword", protect, changePassword);

/** 
 *  6. Change Role
 *  /users/changeRole/: PUT
		+ desc: update user role (NORMAL <-> PREMIUM)
		+ access: require JWT (admin)
		+ req.body: 
			{
				id: ,
				newRole: ,
			}
		+ return values: 
			{
				statusCode:
				message: (success/error message)
				data: null
             }
*/
router.put("/changeRole", protect, isAdmin, changeRole);

/** 
 *  7. Get all users
    /users: GET
    + desc: get all users
    + access: require JWT (admin)
    + return values: 
        {
            statusCode:
            message:
            data: [user] (null if errors occurs)
        }
 */
router.get("/", protect, isAdmin, getAllUsers);

/**
 *  8. Delete user by ID
 *  /users/{id}: DEL
    + desc: delete user
    + access: require JWT (admin)
    + return values: 
        {
            statusCode:
            message: (success/error message)
            data: null
        }
 */
router.delete("/:id", protect, isAdmin, deleteUserByID);

module.exports = router;
