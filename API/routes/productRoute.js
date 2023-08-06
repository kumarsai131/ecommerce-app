const express = require("express");
const router = express.Router();
const {
  addController,
  getController,
} = require("../controller/productController");

router.post("/addProduct", addController);
router.post("/getProduct", getController);

module.exports = router;
