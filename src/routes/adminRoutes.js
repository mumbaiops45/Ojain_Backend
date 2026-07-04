// // const express = require("express");

// // const router = express.Router();
// // const { adminLogin, refreshAdminToken } = require("../controllers/adminController");
// // const {
// //   getDashboardStats,

// //   getPendingVendors,

// //   approveVendor,

// //   unapproveVendor,

// //   rejectVendor,

// //   getAllOrders,

// //   getAllProducts,

// //   approveProduct,

// //   rejectProduct,

// //   getPayoutSummary,

// //   markPayoutPaid,
// // } = require("../controllers/adminController");

// // const {
// //   protect,

// //   adminOnly,
// // } = require("../middleware/authMiddleware");

// // // ================= DASHBOARD =================
// // router.get(
// //   "/dashboard",
// //   protect,
// //   adminOnly,
// //   getDashboardStats
// // );

// // // ================= VENDORS =================

// // // GET PENDING VENDORS
// // router.get(
// //   "/vendors/pending",
// //   protect,
// //   adminOnly,
// //   getPendingVendors
// // );

// // // APPROVE VENDOR
// // router.put(
// //   "/vendors/:id/approve",
// //   protect,
// //   adminOnly,
// //   approveVendor
// // );
// // router.put("/:id/unapprove", protect, adminOnly, unapproveVendor);

// // // REJECT VENDOR
// // router.delete(
// //   "/vendors/:id/reject",
// //   protect,
// //   adminOnly,
// //   rejectVendor
// // );

// // // ================= PRODUCTS =================

// // // GET ALL PRODUCTS
// // router.get(
// //   "/products",
// //   protect,
// //   adminOnly,
// //   getAllProducts
// // );

// // // APPROVE PRODUCT
// // router.put(
// //   "/products/:id/approve",
// //   protect,
// //  adminOnly,
// //   approveProduct
// // );

// // // REJECT PRODUCT
// // router.delete(
// //   "/products/:id/reject",
// //   protect,
// //   adminOnly,
// //   rejectProduct
// // );

// // // ================= ORDERS =================

// // // GET ALL ORDERS
// // router.get(
// //   "/orders",
// //   protect,
// //   adminOnly,
// //   getAllOrders
// // );

// // // ================= PAYOUTS =================

// // // GET PAYOUT SUMMARY
// // router.get(
// //   "/payouts",
// //   protect,
// //   adminOnly,
// //   getPayoutSummary
// // );

// // // MARK PAYOUT PAID
// // router.put(
// //   "/payouts/mark-paid",
// //   protect,
// //   adminOnly,
// //   markPayoutPaid
// // );
// // router.post("/login", adminLogin);
// // router.post("/refresh", refreshAdminToken);
// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// // ==========================================
// // CONTROLLERS
// // ==========================================
// const {
//   // AUTH
//   adminLogin,
//   refreshAdminToken,

//   // DASHBOARD
//   getDashboardStats,

//   // VENDORS
//   getPendingVendors,
//   approveVendor,
//   unapproveVendor,
//   rejectVendor,

//   // PRODUCTS
//   getAllProducts,
//   approveProduct,
//   rejectProduct,

//   // ORDERS
//   getAllOrders,

//   // PAYOUTS
//   getPayoutSummary,
//   markPayoutPaid,
// } = require("../controllers/adminController");

// // ==========================================
// // MIDDLEWARE
// // ==========================================
// const {
//   protect,
//   adminOnly,
// } = require("../middleware/authMiddleware");

// // ==========================================
// // AUTH ROUTES
// // ==========================================

// // ADMIN LOGIN
// router.post(
//   "/login",
//   adminLogin
// );

// // REFRESH TOKEN
// router.post(
//   "/refresh",
//   refreshAdminToken
// );

// // ==========================================
// // DASHBOARD ROUTES
// // ==========================================

// // GET DASHBOARD STATS
// router.get(
//   "/dashboard",
//   protect,
//   adminOnly,
//   getDashboardStats
// );

// // ==========================================
// // VENDOR ROUTES
// // ==========================================

// // GET PENDING VENDORS
// router.get(
//   "/vendors/pending",
//   protect,
//   adminOnly,
//   getPendingVendors
// );

// // APPROVE VENDOR
// router.put(
//   "/vendors/:id/approve",
//   protect,
//   adminOnly,
//   approveVendor
// );

// // UNAPPROVE VENDOR
// router.put(
//   "/vendors/:id/unapprove",
//   protect,
//   adminOnly,
//   unapproveVendor
// );

// // REJECT VENDOR
// router.delete(
//   "/vendors/:id/reject",
//   protect,
//   adminOnly,
//   rejectVendor
// );

// // ==========================================
// // PRODUCT ROUTES
// // ==========================================

// // GET ALL PRODUCTS
// router.get(
//   "/products",
//   protect,
//   adminOnly,
//   getAllProducts
// );

// // APPROVE PRODUCT
// router.put(
//   "/products/:id/approve",
//   protect,
//   adminOnly,
//   approveProduct
// );

// // REJECT PRODUCT
// router.delete(
//   "/products/:id/reject",
//   protect,
//   adminOnly,
//   rejectProduct
// );

// // ==========================================
// // ORDER ROUTES
// // ==========================================

// // GET ALL ORDERS
// router.get(
//   "/orders",
//   protect,
//   adminOnly,
//   getAllOrders
// );

// // ==========================================
// // PAYOUT ROUTES
// // ==========================================

// // GET PAYOUT SUMMARY
// router.get(
//   "/payouts",
//   protect,
//   adminOnly,
//   getPayoutSummary
// );

// // MARK PAYOUT PAID
// router.put(
//   "/payouts/mark-paid",
//   protect,
//   adminOnly,
//   markPayoutPaid
// );

// // ==========================================
// // EXPORT ROUTER
// // ==========================================
// module.exports = router;


const express = require("express");
const router = express.Router();

// ==========================================
// CONTROLLERS
// ==========================================
const {
  // AUTH
  adminLogin,
  refreshAdminToken,

  // DASHBOARD
  getDashboardStats,

  // DEALERS (renamed)
  getPendingDealers,
  approveDealer,
  unapproveDealer,
  rejectDealer,

  // PRODUCTS
  getAllProducts,
  approveProduct,
  rejectProduct,

  // ORDERS
  getAllOrders,

  // PAYOUTS
  getPayoutSummary,
  markPayoutPaid,
} = require("../controllers/adminController");

// ==========================================
// MIDDLEWARE
// ==========================================
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ==========================================
// AUTH ROUTES
// ==========================================

router.post("/login", adminLogin);
router.post("/refresh", refreshAdminToken);

// ==========================================
// DASHBOARD ROUTES
// ==========================================

router.get("/dashboard", protect, adminOnly, getDashboardStats);

// ==========================================
// DEALER ROUTES (new endpoints)
// ==========================================

// GET PENDING DEALERS
router.get("/dealers/pending", protect, adminOnly, getPendingDealers);
  
// APPROVE DEALER
router.put("/dealers/:id/approve", protect, adminOnly, approveDealer);

// UNAPPROVE DEALER
router.put("/dealers/:id/unapprove", protect, adminOnly, unapproveDealer);

// REJECT DEALER
router.delete("/dealers/:id/reject", protect, adminOnly, rejectDealer);

// ==========================================
// PRODUCT ROUTES (unchanged)
// ==========================================

router.get("/products", protect, adminOnly, getAllProducts);
router.put("/products/:id/approve", protect, adminOnly, approveProduct);
router.delete("/products/:id/reject", protect, adminOnly, rejectProduct);

// ==========================================
// ORDER ROUTES (unchanged)
// ==========================================

router.get("/orders", protect, adminOnly, getAllOrders);

// ==========================================
// PAYOUT ROUTES (unchanged)
// ==========================================

router.get("/payouts", protect, adminOnly, getPayoutSummary);
router.put("/payouts/mark-paid", protect, adminOnly, markPayoutPaid);

module.exports = router;