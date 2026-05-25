const express = require("express");

const router = express.Router();

// ==========================================
// CONTROLLERS
// ==========================================
const uploadVendorImage =
  require("../middleware/vendorUpload");
const {
  // AUTH
  refreshVendorToken,

  // DASHBOARD
  getVendorDashboard,

  // VENDOR CRUD
  getAllVendors,
  getVendorById,
  updateVendor,
  rejectVendor,

  // PROFILE
  getVendorProfile,
  updateVendorProfile,
 

  // EARNINGS
  getVendorEarnings,

  // APPROVAL
  getPendingVendors,
  approveVendor,
  unapproveVendor,
} = require("../controllers/vendorController");

// ==========================================
// MIDDLEWARE
// ==========================================
const {
  protect,
  vendorOnly,
  adminOnly,
} = require("../middleware/authMiddleware");

// ==========================================
// AUTH ROUTES
// ==========================================

// REFRESH TOKEN
router.post(
  "/refresh",
  refreshVendorToken
);

// ==========================================
// VENDOR SELF ROUTES
// ==========================================

// DASHBOARD
router.get(
  "/dashboard",
  protect,
  vendorOnly,
  getVendorDashboard
);

// PROFILE
router.get(
  "/profile",
  protect,
  vendorOnly,
  getVendorProfile
);


router.put(
  "/profile",
  protect,
  vendorOnly,

  uploadVendorImage.single(
    "profileImage"
  ),

  updateVendorProfile
);

// EARNINGS
router.get(
  "/earnings",
  protect,
  vendorOnly,
  getVendorEarnings
);

// ==========================================
// ADMIN ROUTES
// ==========================================

// GET ALL VENDORS
router.get(
  "/",
  protect,
  adminOnly,
  getAllVendors
);

// GET PENDING VENDORS
router.get(
  "/pending",
  protect,
  adminOnly,
  getPendingVendors
);

// APPROVE VENDOR
router.put(
  "/:id/approve",
  protect,
  adminOnly,
  approveVendor
);

// UNAPPROVE VENDOR
router.put(
  "/:id/unapprove",
  protect,
  adminOnly,
  unapproveVendor
);

// UPDATE VENDOR
router.put(
  "/:id",
  protect,
  adminOnly,
  updateVendor
);

// DELETE VENDOR
router.delete(
  "/:id",
  protect,
  adminOnly,
  rejectVendor
);

// ==========================================
// PUBLIC ROUTE
// ==========================================

// GET SINGLE VENDOR
// KEEP THIS LAST
router.get(
  "/:id",
  getVendorById
);

module.exports = router;