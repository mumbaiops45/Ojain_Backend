  const express = require("express");

  const router = express.Router();

  const {
    createReview,
    getAllReviews,
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

  // GET ALL REVIEWS (PUBLIC)
  router.get(
    "/",
    getAllReviews
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