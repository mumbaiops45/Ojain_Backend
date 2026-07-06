const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

const {
  protect,
  customerOnly,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  customerOnly,
  addToWishlist
);

router.get(
  "/",
  protect,
  customerOnly,
  getWishlist
);

router.delete(
  "/:productId",
  protect,
  customerOnly,
  removeFromWishlist
);

router.get(
  "/check/:productId",
  protect,
  customerOnly,
  checkWishlist
);

router.delete(
  "/",
  protect,
  customerOnly,
  clearWishlist
);

module.exports = router;