const express = require("express");
const router = express.Router();

const productsController = require("../controller/products");

//delete Route for products collection
router.delete("/product/:productid", productsController.deleteProduct);

//Create Route for products
router.create("/products", productsController.createProduct);

//Put Route for products collection
router.put('/:id', productsController.updateProduct);

module.exports = router;
