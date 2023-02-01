const express = require("express");

// controllers
const {
    addProduct,
    getAllProducts,
    updateProduct,
    findProductsBySlug,
    findProductById,
    deleteProduct,
} = require("../controllers/productControllers");

// middlewares
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
/**
 *  1. Add product
    /products/add-product: POST 
	+ desc: add new product
	+ access: admin
	+ req.body: 
		{
            name: ,
            slug: ,
            price: ,
            qt: ,
            description: ,
            image: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: {
                        name,
                        slug,
                        price,
                        qty,
                        imageURL,
                        description,
                    },
        }
 */
router.post("/add-product", protect, isAdmin, addProduct);

/**
 *  2. Get all products
    /products/: GET 
	+ desc: get all products
	+ access: none
	+ return values: 
        {
            statusCode:
            message:
            data: ,
        }
 */
router.get("/", getAllProducts);

/**
 *  3. Get all products with slug containing a string from user request parameters 
    /products/find/:slug: GET 
	+ desc: Get all products with slug containing a string from user request parameters 
	+ access: none
	+ return values: 
        {
            statusCode:
            message:
            data: ,
        }
 */
router.get("/find/:slug", findProductsBySlug);

/**
 *  4. Find product by ID 
    /products/find/:slug: GET 
	+ desc: Find product by ID 
	+ access: none
	+ return values: 
        {
            statusCode:
            message:
            data: ,
        }
 */
router.get("/findByID/:id", findProductById);

/**
 *  5. update products based on id 
    /products/:id: PUT 
	+ desc: update products based on id 
	+ access: admin
    + req.body: {
            name: ,
            slug: ,
            price: ,
            description: ,
            image: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: ,
        }
 */
router.put("/:id", protect, isAdmin, updateProduct);

/**
 *  6. delete products based on id 
    /products/:id: DEL 
	+ desc: delete products based on id 
	+ access: admin
	+ req.body: (all fields optional)
		{
            name: ,
            slug: ,
            price: ,
            description: ,
            image: ,
		}
	+ return values: 
        {
            statusCode:
            message:
            data: ,
        }
 */
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
