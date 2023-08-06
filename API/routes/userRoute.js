const express = require("express");
const router = express.Router();
const {
  userController,
  updateController,
  deleteController,
  loginContoller,
} = require("../controller/userController");

router.post("/login", loginContoller);

router.get("/getAllUsers", userController);

router.patch("/updateUser", updateController);

router.delete("/deleteUser/:id", deleteController);

module.exports = router;
