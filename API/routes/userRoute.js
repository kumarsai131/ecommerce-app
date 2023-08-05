const express = require("express");
const router = express.Router();
const {
  userController,
  updateController,
  deleteController,
} = require("../controller/userController");

router.get("/getAllUsers", userController);

router.patch("/updateUser", updateController);

router.delete("/deleteUser/:id", deleteController);

module.exports = router;
