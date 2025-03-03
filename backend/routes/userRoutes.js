import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserProfileById
} from "../controllers/userControllers.js";
import {
  authenticate,
  authenticateAdmin
} from "../middlewares/authMiddleware.js";
const router = Router();
router.post("/", createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);

// admin routes ✨🤞
router.get("/", authenticate, authenticateAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticate, authenticateAdmin, deleteUserById)
  .get(authenticate, authenticateAdmin, getUserById)
  .put(authenticate, authenticateAdmin, updateUserProfileById);
export default router;
