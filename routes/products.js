const express = require("express");
const router = express.Router();

const productsController = require("../controller/products");

//delete Route for products collection
router.delete("/product/:productid", productsController.deleteProduct);

module.exports = router;
