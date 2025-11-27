const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categories");

//delete Route for categories collection
router.delete("/category/:categoryid", categoryController.deleteCategory);

//route to create a category
router.create("/categories", categoryController.createCategory);

module.exports = router;
