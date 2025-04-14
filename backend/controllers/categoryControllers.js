import categoryModel from "../models/categoryModel.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.json({ error: "Name is required!" });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res.json({ error: "Category already exists!" });
    const newCategory = await categoryModel.create({ name });
    return res.json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    if (!categoryId) return res.json({ error: "Id required" });
    if (!name?.trim())
      return res.json({ error: "A category name is required for updating" });
    const category = await categoryModel.findById(categoryId);
    if (!category)
      return res.status(404).json({ error: "Category not found!" });
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) return res.json({ error: "Id required" });
    const removed = await categoryModel.findByIdAndDelete(categoryId);
    if (!removed) return res.json({ error: "Category not found" });
    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export const listCategories = asyncHandler(async (req, res) => {
  try {
    const all = await categoryModel.find();
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export const readCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) return res.json({ error: "Category id required!" });
    const category = await categoryModel.findById(categoryId);
    if (!category) return res.json({ error: "Category not found!" });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
