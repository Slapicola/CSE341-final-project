const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categories");

//delete Route for categories collection
router.delete("/category/:categoryid", categoryController.deleteCategory);

//Put Route for categories collection
router.put('/:id', categoriesController.updateCategory);

module.exports = router;
