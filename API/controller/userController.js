const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");

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
    // // when we compare strings
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

    // let id = Object(data.productId)
    // expression 2+3
    // _id === idFromUserCollection

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

    const data = await userModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "cart",
        },
      },
    ]);
    let currentUserData = data.find((e) => {
      return e._id.toString() === userId;
    });
    res.json({
      success: true,
      cart: currentUserData.cart,
    });
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
};

module.exports = {
  userController,
  updateController,
  deleteController,
  loginContoller,
  addToCartController,
  getCartController,
};
