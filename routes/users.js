const express = require("express");
const router = express.Router();

const usersController = require("../controller/users");
const { userValidation, validate } = require("../middleware/validation");

// GET ALL USERS
router.get("/", usersController.getAllUsers);

// GET USER BY ID
router.get("/:id", usersController.getUserById);

//delete Route for users collection
router.delete("/:id", usersController.deleteUser);

//update Route for users collection
router.put("/:id", userValidation, validate, usersController.updateUser);

module.exports = router;
