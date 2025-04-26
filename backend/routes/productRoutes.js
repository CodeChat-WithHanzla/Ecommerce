import { Router } from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authenticateAdmin
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProduct,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts
} from "../controllers/productController.js";
const router = Router();
router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authenticateAdmin, formidable(), addProduct);
router
  .route("/allProducts")
  .get(authenticate, authenticateAdmin, fetchAllProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router
  .route("/:id")
  .get(checkId, fetchProductById)
  .put(authenticate, authenticateAdmin, formidable(), checkId, updateProduct)
  .delete(authenticate, authenticateAdmin, checkId, removeProduct);
export default router;
