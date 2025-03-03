import userModel from "../models/userModel.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import error from "../utils/error.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

// @desc    Create a new user
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new error(400, "Please fill in all fields");
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    throw new error(400, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword
  });
  const { password: userPassword, ...createdUser } = user._doc;
  createToken(res, createdUser._id);
  return res.status(201).json({ ...createdUser });
});
// @desc    Login a user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new error(400, "Please fill in all fields");
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new error(404, "User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new error(401, "Invalid credentials");
  }
  const { password: userPassword, ...loggedInUser } = user._doc;
  createToken(res, loggedInUser._id);
  return res.status(200).json({ ...loggedInUser });
});
// @desc    Logout a user
export const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logged out successfully" });
});
// @desc    Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    throw new error(404, "User not found");
  }
  return res.status(200).json(user);
});
// @desc    Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    throw new error(404, "User not found");
  }
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    throw new error(400, "Please provide at least one field to update.");
  }
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  await user.save();
  return res.status(200).json(user);
});

// @desc    Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  return res.status(200).json(users);
});

// @desc    Delete a user
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new error(404, "User not found");
  }
  if (user.isAdmin) {
    throw new error(400, "Cannot delete an admin user");
  }
  await user.deleteOne();
  return res.status(200).json({ message: "User deleted successfully" });
});
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new error(404, "User not found");
  }
  return res.status(200).json(user);
});
export const updateUserProfileById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new error(404, "User not found");
  }
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    throw new error(400, "Please provide at least one field to update.");
  }
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  await user.save();
  return res.status(200).json(user);
});
