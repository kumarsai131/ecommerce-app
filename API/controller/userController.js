const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");

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

module.exports = { userController, updateController, deleteController };
