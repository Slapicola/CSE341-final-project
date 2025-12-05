const express = require("express");
const router = express.Router();

const usersController = require("../controller/users");
const { userValidation, validate } = require("../middleware/validation");

//delete Route for users collection
router.delete("/:id", usersController.deleteUser);

//update Route for users collection
router.put("/:id", userValidation, validate, usersController.updateUser);

module.exports = router;
