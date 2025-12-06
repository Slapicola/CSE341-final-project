const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");
const { orderValidation, validate } = require("../middleware/validation");
const { isAuthenticated } = require('../middleware/authenticate');

// GET ALL ORDERS
router.get("/", ordersController.getAllOrders);

// GET ORDER BY ID
router.get("/:id", ordersController.getOrderById);

//delete Route for orders collection
router.delete("/:id", ordersController.deleteOrder);

//update Route for orders collection
router.put("/:id", isAuthenticated, orderValidation, validate, ordersController.updateOrder);

module.exports = router;
