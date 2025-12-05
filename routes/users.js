const express = require("express");
const router = express.Router();

const usersController = require("../controller/users");

//delete Route for users collection
router.delete("/:id", usersController.deleteUser);

//update Route for users collection
router.put("/:id", usersController.updateUser);

module.exports = router;
