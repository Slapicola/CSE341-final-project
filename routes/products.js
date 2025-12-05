const express = require("express");
const router = express.Router();

const productsController = require("../controller/products");
const { productValidation, validate } = require("../middleware/validation");

//GET ALL PRODUCTS AND GET PRODUCT BY ID routes
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);

//delete Route for products collection
router.delete("/:id", productsController.deleteProduct);

//POST Route for products
router.post("/", productValidation, validate, productsController.createProduct);

//Put Route for products collection
router.put('/:id', productValidation, validate, productsController.updateProduct);




module.exports = router;
