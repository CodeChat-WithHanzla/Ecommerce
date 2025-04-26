import { asyncHandler } from "../middlewares/asyncHandler.js";
import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    const { image } = req.files;
    const imageUpload = await cloudinary.uploader.upload(image.path, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;
    // Validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !category:
        return res.status(400).json({ error: "Cateory is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
      case !brand:
        return res.status(400).json({ error: "Brand name is required" });
      case !image:
        return res.status(400).json({ error: "Image is required" });
    }
    const product = new productModel({ ...req.fields, image: imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: "Please provide id of the product to update." });
    const updatedData = req.fields;
    const { image } = req.files;
    if (!updatedData || (Object.keys(updatedData).length === 0 && !image)) {
      return res
        .status(400)
        .json({ error: "Please provide at least one field to update." });
    }
    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: "image"
      });
      const imageUrl = imageUpload.secure_url;
      updatedData.image = imageUrl;
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: "Product not found with the provided ID." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const removeProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: "Please provide id of the product to delete." });
    const product = await productModel.findByIdAndDelete(id);
    if (!product) return res.status(400).json({ error: "Please try again." });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await productModel.countDocuments({ ...keyword });
    const page = Number(req.query.page) || 1;
    const products = await productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    const hasMore = page < Math.ceil(count / pageSize);

    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: "Please provide id of the product." });
    const product = await productModel.findById(id);
    if (!product) return res.status(400).json({ error: "Product not found." });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const fetchAllProducts = asyncHandler(async (_, res) => {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (!products) return res.status(400).json({ error: "No Product found." });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: "Please provide id of the product." });
    const { rating, comment } = req.body;
    const product = await productModel.findById(id);
    if (!product) return res.status(400).json({ error: "Product not found" });
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed)
      return res.status(400).json({ error: "Product already reviewed" });
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      (product.reviews.length || 1);

    await product.save();
    res.status(201).json({ message: "Review added." });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await productModel.find().sort({ rating: -1 }).limit(4);
    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
