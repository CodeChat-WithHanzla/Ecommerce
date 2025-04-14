import { Router } from "express";
import {
  authenticate,
  authenticateAdmin
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
  readCategory
} from "../controllers/categoryControllers.js";

const router = Router();
router.route("/").post(authenticate, authenticateAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authenticateAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authenticateAdmin, removeCategory);
router.get("/categories", listCategories);
router.route("/:categoryId").get(readCategory);
export default router;
