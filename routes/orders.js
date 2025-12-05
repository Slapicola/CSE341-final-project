const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");

//delete Route for orders collection
router.delete("/:id", ordersController.deleteOrder);

//update Route for orders collection
router.put("/:id", ordersController.updateOrder);

module.exports = router;
