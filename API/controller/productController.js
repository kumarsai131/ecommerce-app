const asyncHandler = require("express-async-handler");
const productModel = require("../model/productsModel");

const addController = asyncHandler(async (req, res, next) => {
  const { courseName, author, price, tags, isPublished } = req.body;

  let newProduct = new productModel({
    courseName: courseName,
    author: author,
    price: price,
    tags: tags,
    isPublished: isPublished,
  });

  try {
    await newProduct.validate();
    await productModel.create(newProduct);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

const getController = asyncHandler(async (req, res) => {
  const { courseName, price } = req.body;

  // 100000 courses
  // Pagination
  //   let checkCourse = await productModel.count();
  //   let checkCourse = await productModel.find().select({ courseName: 0 }); // 1 include, 0 exclude
  let checkCourse = await productModel.find().sort({ price: -1 }); // 1 ascending -1 descending
  res.json({
    totalProducts: checkCourse,
  });
});

module.exports = { addController, getController };
