const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categories");


//GET ALL CATEGORIES AND GET CATEGORY BY ID routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

//delete Route for categories collection
router.delete("/category/:categoryid", categoryController.deleteCategory);

<<<<<<< HEAD
=======
//Put Route for categories collection
router.put('/:id', categoryController.updateCategory);

>>>>>>> e5fe68b14504edc99d9b51ff78f6c02a648fbabd
module.exports = router;
