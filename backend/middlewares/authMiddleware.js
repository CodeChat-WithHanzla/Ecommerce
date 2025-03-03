import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { asyncHandler } from "./asyncHandler.js";

// Authorization
export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token required" });
  }
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(userId);
  next();
});
export const authenticateAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, Admin token required" });
  }
};
