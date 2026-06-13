// // // =============================================
// // // src/routes/authRoutes.js
// // // =============================================

// // const express =
// //   require("express");

// // const router =
// //   express.Router();

// // const {
// //   registerCustomer,

// //   loginCustomer,

// //   registerVendor,

// //   loginVendor,

// //   adminLogin,

// //   logoutUser,
// // } = require(
// //   "../controllers/authController"
// // );

// // const {
// //   protect,
// // } = require(
// //   "../middleware/authMiddleware"
// // );

// // // CUSTOMER
// // router.post(
// //   "/register",
// //   registerCustomer
// // );

// // router.post(
// //   "/login",
// //   loginCustomer
// // );

// // // VENDOR
// // router.post(
// //   "/vendor/register",
// //   registerVendor
// // );

// // router.post(
// //   "/vendor/login",
// //   loginVendor
// // );

// // // ADMIN
// // router.post(
// //   "/admin/login",
// //   adminLogin
// // );

// // // LOGOUT
// // router.post(
// //   "/logout",
// //   protect,
// //   logoutUser
// // );

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const {
//   registerCustomer,
//   loginCustomer,
//   registerVendor,
//   loginVendor,
//   adminLogin,
//   logoutUser,
// } = require("../controllers/authController");

// const { protect } = require("../middleware/authMiddleware");

// // CUSTOMER
// router.post("/register", registerCustomer);

// router.post("/login", loginCustomer);

// // VENDOR
// router.post("/vendor/register", registerVendor);

// router.post("/vendor/login", loginVendor);

// // ADMIN
// router.post("/admin/login", adminLogin);

// // LOGOUT
// router.post("/logout", protect, logoutUser);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  registerCustomer,
  loginCustomer,
  registerVendor,
  loginVendor,
  adminLogin,
  logoutUser,

  // ADMIN USER CRUD
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const {
  getMyProfile,
  updateMyProfile,
  changePassword,
  uploadAvatar,
} = require("../controllers/profileController");

const {
  protect,
  adminOnly,
  customerOnly,
} = require("../middleware/authMiddleware");

const profileUpload = require("../middleware/profileUpload");

// ==========================================
// CUSTOMER
// ==========================================
router.post("/register", registerCustomer);

router.post("/login", loginCustomer);

// ==========================================
// VENDOR
// ==========================================
router.post(
  "/vendor/register",
  registerVendor
);

router.post(
  "/vendor/login",
  loginVendor
);

// ==========================================
// ADMIN LOGIN
// ==========================================
// router.post(
//   "/admin/login",
//   adminLogin
// );

// ==========================================
// LOGOUT
// ==========================================
router.post(
  "/logout",
  protect,
  logoutUser
);

// ==========================================
// CUSTOMER PROFILE
// ==========================================

// GET MY PROFILE
router.get(
  "/profile",
  protect,
  customerOnly,
  getMyProfile
);

// UPDATE MY PROFILE
router.put(
  "/profile",
  protect,
  customerOnly,
  updateMyProfile
);

// CHANGE PASSWORD
router.put(
  "/profile/change-password",
  protect,
  customerOnly,
  changePassword
);

// UPLOAD AVATAR
router.put(
  "/profile/avatar",
  protect,
  customerOnly,
  profileUpload.single("avatar"),
  uploadAvatar
);

// ==========================================
// ADMIN USER CRUD
// ==========================================

// GET ALL USERS
router.get(
  "/admin/users",
  protect,
  adminOnly,
  getAllUsers
);

// GET SINGLE USER
router.get(
  "/admin/users/:id",
  protect,
  adminOnly,
  getUserById
);

// UPDATE USER
router.put(
  "/admin/users/:id",
  protect,
  adminOnly,
  updateUser
);

// DELETE USER
router.delete(
  "/admin/users/:id",
  protect,
  adminOnly,
  deleteUser
);

module.exports = router;