const Category = require("../models/Category");

// CREATE CATEGORY (with file upload)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/${req.file.path}`
      : "";

    if (!name || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const category = await Category.create({
      name,
      description,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE CATEGORY
const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = { name, description };
    // if (req.file) {
    //   updateData.image = req.file.path;
    // }
    if (req.file) {
      updateData.image =
        `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    // const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
    //   new: true,
    //   runValidators: true,
    // });
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Category updated", category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};