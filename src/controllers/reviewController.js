const Review = require("../models/Review");

const Product = require("../models/Product");

// ================= CREATE REVIEW =================
const createReview = async (req, res) => {
  try {
    const review = await Review.create(
      req.body
    );

    // UPDATE PRODUCT AVG RATING
    const reviews = await Review.find({
      productId: review.productId,
    });

    const avg =
      reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / reviews.length;

    await Product.findByIdAndUpdate(
      review.productId,
      {
        avgRating: avg,
      }
    );

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

// ================= GET PRODUCT REVIEWS =================
const getProductReviews = async (
  req,
  res
) => {
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

// ================= DELETE REVIEW =================
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  deleteReview,
};