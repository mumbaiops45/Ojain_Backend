const Review = require("../models/Review");
const Product = require("../models/Product");

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const { productId, vendorId, rating, comment } = req.body;

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      customerId: req.user.id,
      productId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    const review = await Review.create({
      customerId: req.user.id,
      productId,
      vendorId,
      rating,
      comment,
    });

    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET REVIEWS
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    })
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    const productId = review.productId;

    await review.deleteOne();

    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE AVG RATING
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ productId });

  const avg =
    reviews.length > 0
      ? reviews.reduce((sum, item) => sum + item.rating, 0) /
        reviews.length
      : 0;

  await Product.findByIdAndUpdate(productId, {
    avgRating: avg.toFixed(1),
    reviewCount: reviews.length,
  });
};

module.exports = {
  createReview,
  getProductReviews,
  deleteReview,
};