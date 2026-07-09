// // const express = require("express");

// // const router = express.Router();

// // const productController = require("../controllers/productController");

// // const {
// //   protect,
// //   adminOnly,
// //   adminOnly,
// // } = require("../middleware/authMiddleware");

// // // PUBLIC
// // router.get(
// //   "/",
// //   productController.getAllProducts
// // );

// // router.get(
// //   "/:id",
// //   productController.getProductById
// // );

// // // VENDOR
// // router.post(
// //   "/",
// //   protect,
// //   adminOnly,
// //   productController.createProduct
// // );

// // router.put(
// //   "/:id",
// //   protect,
// //   adminOnly,
// //   productController.updateProduct
// // );

// // // VENDOR PRODUCTS
// // router.get(
// //   "/vendor/my-products",
// //   protect,
// //   adminOnly,
// //   productController.getVendorProducts
// // );

// // // GET SINGLE PRODUCT
// // router.get(
// //   "/:id",
// //   productController.getProductById
// // );

// // // ADMIN
// // router.put(
// //   "/:id/approve",
// //   protect,
// //   adminOnly,
// //   productController.approveProduct
// // );

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const productController = require(
//   "../controllers/productController"
// );

// const {
//   protect,
//   adminOnly,
//   adminOnly,
// } = require("../middleware/authMiddleware");

// // =============================================
// // PUBLIC ROUTES
// // =============================================

// // GET ALL PRODUCTS
// router.get(
//   "/",
//   productController.getAllProducts
// );

// // GET SINGLE PRODUCT
// // router.get(
// //   "/:id",
// //   productController.getProductById
// // );
// // CATEGORY
// router.get(
//   "/category/:categoryId",
//   productController.getProductsByCategory
// );

// // GET SINGLE PRODUCT
// router.get(
//   "/:id",
//   productController.getProductById
// );

// // =============================================
// // VENDOR ROUTES
// // =============================================

// // GET VENDOR PRODUCTS
// router.get(
//   "/vendor/my-products",
//   protect,
//   adminOnly,
//   productController.getVendorProducts
// );

// // CREATE PRODUCT
// router.post(
//   "/",
//   protect,
//   adminOnly,
//   productController.createProduct
// );
// router.get(
//   "/category/:categoryId",
//   productController.getProductsByCategory
// );
// // UPDATE PRODUCT
// router.put(
//   "/:id",
//   protect,
//   adminOnly,
//   productController.updateProduct
// );

// // DELETE PRODUCT
// router.delete(
//   "/:id",
//   protect,
//   adminOnly,
//   productController.deleteProduct
// );

// // =============================================
// // ADMIN ROUTES
// // =============================================

// // APPROVE PRODUCT
// router.put(
//   "/:id/approve",
//   protect,
//   adminOnly,
//   productController.approveProduct
// );

// module.exports = router;



const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/productUpload");

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

const productController =
  require(
    "../controllers/productController"
  );

// PUBLIC
router.get(
  "/",
  productController.getAllProducts
);

router.get(
  "/category/:categoryId",
  productController.getProductsByCategory
);

// alias — must be before /:id
router.get(
  "/all",
  productController.getAllProducts
);

// VENDOR PRODUCTS — must be before /:id or Express matches "vendor" as an id
router.get(
  "/vendor/my-products",
  protect,
  adminOnly,
  productController.getVendorProducts
);

router.get(
  "/:id",
  productController.getProductById
);

// CREATE PRODUCT
router.post(
  "/",
  protect,
  adminOnly,
  upload.array(
    "images",
    10
  ),
  productController.createProduct
);

// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array(
    "images",
    10
  ),
  productController.updateProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  adminOnly,
  productController.deleteProduct
);

// ADMIN
router.put(
  "/:id/approve",
  protect,
  adminOnly,
  productController.approveProduct
);

module.exports = router;