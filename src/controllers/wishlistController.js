const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

//
// ADD TO WISHLIST
//
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const exists = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already in wishlist",
      });
    }

    await Wishlist.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// GET WISHLIST
//
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// REMOVE FROM WISHLIST
//
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: productId,
    });

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CHECK PRODUCT
//
const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    res.json({
      success: true,
      inWishlist: !!exists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// CLEAR WISHLIST
//
const clearWishlist = async (req, res) => {
  try {
    await Wishlist.deleteMany({
      user: req.user.id,
    });

    res.json({
      success: true,
      message: "Wishlist cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
};