const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orders");

//delete Route for orders collection
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;
