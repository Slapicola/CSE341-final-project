const express = require("express");
const router = express.Router();

const usersController = require("../controller/users");

//delete Route for users collection
router.delete("/:id", usersController.deleteUser);

module.exports = router;
