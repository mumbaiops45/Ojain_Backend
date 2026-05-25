const express = require("express");

const router = express.Router();

const productController = require(
  "../controllers/productController"
);

const {
  protect,
  vendorOnly,
  adminOnly,
} = require("../middleware/authMiddleware");

// PUBLIC
router.get(
  "/",
  productController.getAllProducts
);

// VENDOR PRODUCTS
router.get(
  "/vendor/my-products",
  protect,
  vendorOnly,
  productController.getVendorProducts
);

// GET SINGLE
router.get(
  "/:id",
  productController.getProductById
);

// CREATE
router.post(
  "/",
  protect,
  vendorOnly,
  productController.createProduct
);

// UPDATE
router.put(
  "/:id",
  protect,
  vendorOnly,
  productController.updateProduct
);

// DELETE
router.delete(
  "/:id",
  protect,
  vendorOnly,
  productController.deleteProduct
);

// APPROVE
router.put(
  "/:id/approve",
  protect,
  adminOnly,
  productController.approveProduct
);

module.exports = router;