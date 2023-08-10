const express = require("express");
const router = express.Router();
const {
  userController,
  updateController,
  deleteController,
  loginContoller,
  addToCartController,
  getCartController,
} = require("../controller/userController");

router.post("/login", loginContoller);

router.get("/getAllUsers", userController);

router.patch("/updateUser", updateController);

router.delete("/deleteUser/:id", deleteController);

router.post("/addToCart", addToCartController);

router.post("/getCartProducts", getCartController);

module.exports = router;
