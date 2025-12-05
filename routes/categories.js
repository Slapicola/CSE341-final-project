const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categories");
const { categoryValidation, validate } = require("../middleware/validation");

//GET ALL CATEGORIES AND GET CATEGORY BY ID routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

//POST route for categories
router.post('/', categoryValidation, validate, categoryController.createCategory);

//delete Route for categories collection
router.delete("/:id", categoryController.deleteCategory);

//Put Route for categories collection
router.put('/:id', categoryValidation, validate, categoryController.updateCategory);

module.exports = router;
