const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// USER ROUTES
// ==========================================

// Create Order
router.post("/", protect, createOrder);

// Get Logged In User Orders
router.get("/", protect, getMyOrders);

// Get Single Order
router.get("/:id", protect, getOrderById);

// ==========================================
// ADMIN ROUTES
// ==========================================

// Get All Orders
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllOrders
);

// Update Full Order
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateOrder
);

// Update Order Status
router.put(
  "/admin/status/:id",
  protect,
  adminOnly,
  updateOrderStatus
);

// Delete Order
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteOrder
);

module.exports = router;