const express = require("express");

const router = express.Router();

const {
  createReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/reviewController");

const {
  protect,
  customerOnly,
  adminOnly,
} = require("../middleware/authMiddleware");

// CUSTOMER
router.post(
  "/",
  protect,
  customerOnly,
  createReview
);

// PUBLIC
router.get(
  "/product/:productId",
  getProductReviews
);

// ADMIN
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteReview
);

module.exports = router;