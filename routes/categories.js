const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categories");

//delete Route for categories collection
router.delete("/category/:categoryid", categoryController.deleteCategory);

module.exports = router;
