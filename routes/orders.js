const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");
const { orderValidation, validate } = require("../middleware/validation");
const { isAuthenticated } = require('../middleware/authenticate');

//delete Route for orders collection
router.delete("/:id", ordersController.deleteOrder);

//update Route for orders collection
router.put("/:id", isAuthenticated, orderValidation, validate, ordersController.updateOrder);

module.exports = router;
