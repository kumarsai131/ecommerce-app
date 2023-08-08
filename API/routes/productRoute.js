const express = require("express");
const router = express.Router();
const {
  addController,
  getController,
  updateController,
} = require("../controller/productController");

router.post("/addProduct", addController);
router.get("/getProducts", getController);
router.patch("/updateProduct", updateController);

module.exports = router;
