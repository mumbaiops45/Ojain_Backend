// const express = require("express");

// const router = express.Router();

// const {
//   registerDealer,
//   loginDealer,
//   refreshDealerToken,
//   logoutDealer,
//   verifyDealer,
// } = require("../controllers/dealerController");

// // Register
// router.post(
//   "/register",
//   registerDealer
// );

// // Login
// router.post(
//   "/login",
//   loginDealer
// );

// // Refresh Token
// router.post(
//   "/refresh",
//   refreshDealerToken
// );

// // Logout
// router.post(
//   "/logout",
//   logoutDealer
// );

// router.post("/verify", verifyDealer);

// module.exports = router;


const express = require("express");
const router = express.Router();

// Middleware
const { protect, dealerOnly } = require("../middleware/authMiddleware");

// Controllers
const {
  registerDealer,
  loginDealer,
  refreshDealerToken,
  logoutDealer,
  verifyDealer,
  getDealerProfile,
  updateDealerProfile,
  getDealerDashboard,
  getDealerEarnings,
} = require("../controllers/dealerController");

// ─── Public Routes ────────────────────────────
router.post("/register", registerDealer);
router.post("/login", loginDealer);
router.post("/refresh", refreshDealerToken);
router.post("/logout", logoutDealer);
router.post("/verify", verifyDealer);

// ─── Protected Routes (dealer only) ───────────
router.get("/profile", protect, dealerOnly, getDealerProfile);
router.put("/profile", protect, dealerOnly, updateDealerProfile);
router.get("/dashboard", protect, dealerOnly, getDealerDashboard);
router.get("/earnings", protect, dealerOnly, getDealerEarnings);

module.exports = router;