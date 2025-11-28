const express = require("express");
const router = express.Router();

const productsController = require("../controller/products");

//GET ALL PRODUCTS AND GET PRODUCT BY ID routes
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);

//delete Route for products collection
router.delete("/:id", productsController.deleteProduct);

//POST Route for products
router.post("/", productsController.createProduct);

//Put Route for products collection
router.put('/:id', productsController.updateProduct);




module.exports = router;
