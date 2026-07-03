const express = require("express");

const router = express.Router();

const {
  registerDealer,
  loginDealer,
  refreshDealerToken,
  logoutDealer,
  verifyDealer,
} = require("../controllers/dealerController");

// Register
router.post(
  "/register",
  registerDealer
);

// Login
router.post(
  "/login",
  loginDealer
);

// Refresh Token
router.post(
  "/refresh",
  refreshDealerToken
);

// Logout
router.post(
  "/logout",
  logoutDealer
);

router.post("/verify", verifyDealer);

module.exports = router;