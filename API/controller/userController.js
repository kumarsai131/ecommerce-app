const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const ordersModel = require("../model/ordersModel");

const loginContoller = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  let checkUser = await userModel.find({ username: { $eq: username } });

  if (checkUser.length === 0) {
    res.status(400);
    throw new Error("User doesn't exist. Click on signup to create the user");
  } else {
    if (checkUser[0].password !== password) {
      res.status(400);
      throw new Error("Incorrect Password");
    }
  }
  try {
    res.json({
      success: true,
      id: checkUser[0]._id,
      role: checkUser[0].role,
      username: username,
    });
  } catch (err) {
    next(err);
  }
});

const userController = asyncHandler(async (req, res, next) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

const updateController = asyncHandler(async (req, res, next) => {
  const { id, username } = req.body;
  const allUsers = await userModel.find();
  const user = allUsers.find((e) => e.id === id);

  if (!user) {
    res.status(400);
    next({ message: "User not found" }, req, res);
  }

  try {
    await userModel.findByIdAndUpdate(id, { username });
    res.send("Record updated successfully");
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

const deleteController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const allUsers = await userModel.find();
  const user = allUsers.find((e) => e.id === id);

  if (!user) {
    res.status(400);
    next({ message: "User not found" }, req, res);
  }

  try {
    await user.remove();
    res.send("Record deleted successfully");
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

const addToCartController = async (req, res, next) => {
  const { userId, productId } = req.body;

  try {
    await userModel.findByIdAndUpdate(userId, {
      $push: { productId: productId },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
};

const getCartController = async (req, res, next) => {
  const { userId } = req.body;

  try {
    // const data = await userModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "productId",
    //       foreignField: "courseName",
    //       as: "cart",
    //     },
    //   },
    // ]);

    // const data = await userModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "products",
    //       let: {
    //         idFromUsersCollection: { $toObjectId: "$productId" },
    //       },
    //       pipeline: [
    //         {
    //           $match: { $expr: { $eq: ["$_id", "$$idFromUsersCollection"] } },
    //         },
    //       ],
    //       as: "cart",
    //     },
    //   },
    // ]);

    const userIdAsObject = new mongoose.Types.ObjectId(userId);
    const data = await userModel.aggregate([
      {
        $match: { $expr: { $eq: [userIdAsObject, "$_id"] } },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "cart",
        },
      },
      {
        $project: {
          cart: 1,
        },
      },
    ]);

    res.json({
      success: true,
      cart: data.length ? data[0].cart : [],
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
};

const placeOrderController = asyncHandler(async (req, res, next) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    res.status(400);
    throw new Error("User Id or Product Id is missing");
  }

  try {
    const data = await ordersModel.create({
      userId: userId,
      productId: productId,
    });
    res.send({
      success: true,
      orderId: data?._id,
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

const clearCartController = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("User Id is missing");
  }

  try {
    const userIdObject = new mongoose.Types.ObjectId(userId);
    await userModel.findByIdAndUpdate(userIdObject, {
      productId: [],
    });
    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

const getOrdersController = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("User Id is missing");
  }

  try {
    const userIdObject = new mongoose.Types.ObjectId(userId);
    const data = await userModel.aggregate([
      {
        $match: { $expr: { $eq: [userIdObject, "$_id"] } },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "Orders",
        },
      },
      {
        $unwind: "$Orders",
      },
      {
        $lookup: {
          from: "products",
          localField: "Orders.productId",
          foreignField: "_id",
          as: "Products",
        },
      },
      {
        $project: {
          Products: 1,
        },
      },
    ]);
    res.json({
      success: true,
      products: data,
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

module.exports = {
  userController,
  updateController,
  deleteController,
  loginContoller,
  addToCartController,
  getCartController,
  placeOrderController,
  clearCartController,
  getOrdersController,
};
