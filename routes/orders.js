const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");
const { orderValidation, validate } = require("../middleware/validation");

//delete Route for orders collection
router.delete("/:id", ordersController.deleteOrder);

//update Route for orders collection
router.put("/:id", orderValidation, validate, ordersController.updateOrder);

module.exports = router;
