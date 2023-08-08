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

const getController = asyncHandler(async (req, res, next) => {
  let limitPerPage = "";
  let currentPage = "";

  if (req.query) {
    limitPerPage = parseInt(req.query.limitPerPage);
    currentPage = parseInt(req.query.currentPage);
  }

  let skip = 0;
  if (limitPerPage && currentPage) {
    skip = (currentPage - 1) * limitPerPage;
  }

  try {
    let total = await productModel.find().count();
    let products = await productModel.find().skip(skip).limit(limitPerPage);
    res.json({
      totalNumberOfProducts: total,
      products: products,
      skip: skip,
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

const updateController = async (req, res, next) => {
  const { id, isPublished } = req.body;

  if (!id) {
    throw new Error("ID is missing.");
  }
  try {
    await productModel.findByIdAndUpdate(id, { isPublished: isPublished });
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};

// total number of products
// limit per page 3
// total/limit per page
// if i am in the second, first 3 products from the db should be skipped
// 2nd page, pageNo*limit items should be skipped

module.exports = { addController, getController, updateController };
