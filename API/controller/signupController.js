const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");

const signupController = asyncHandler(async (req, res, next) => {
  const { username, password, role } = req.body;
  let newUser = new userModel({
    username,
    password,
    role,
  });

  try {
    await newUser.validate();
    await userModel.create(newUser);
    res.send("Record inserted successfully");
  } catch (err) {
    res.status(400);
    next(err, req, res);
  }
});

module.exports = { signupController };
