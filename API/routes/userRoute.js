const express = require("express");
const router = express.Router();
const {
  userController,
  updateController,
  deleteController,
  loginContoller,
  addToCartController,
  getCartController,
  placeOrderController,
  clearCartController,
  getOrdersController,
} = require("../controller/userController");

router.post("/login", loginContoller);

router.get("/getAllUsers", userController);

router.patch("/updateUser", updateController);

router.delete("/deleteUser/:id", deleteController);

router.post("/addToCart", addToCartController);

router.post("/getCartProducts", getCartController);

router.post("/placeOrder", placeOrderController);

router.post("/clearCart", clearCartController);

router.post("/getOrders", getOrdersController);

module.exports = router;
