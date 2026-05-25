// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/uploadMiddleware"); // import multer config
// const {
//   createCategory,
//   getAllCategories,
//   getSingleCategory,
//   updateCategory,
//   deleteCategory,
// } = require("../controllers/categoryController");

// // Use upload.single('image') – 'image' is the field name sent from frontend
// router.post("/create", upload.single("image"), createCategory);
// router.get("/all", getAllCategories);
// router.get("/:id", getSingleCategory);
// router.put("/update/:id", upload.single("image"), updateCategory);
// router.delete("/delete/:id", deleteCategory);
// router.get(
//   "/vendor/my-products",
//   protect,
//   vendorOnly,
//   productController.getVendorProducts
// );
// router.get("/:id", productController.getProductById);

// module.exports = router;

const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// CREATE CATEGORY
router.post(
  "/create",
  upload.single("image"),
  createCategory
);

// GET ALL
router.get("/all", getAllCategories);



// GET SINGLE
router.get("/:id", getSingleCategory);

// UPDATE
router.put(
  "/update/:id",
  upload.single("image"),
  updateCategory
);

// DELETE
router.delete("/delete/:id", deleteCategory);

module.exports = router;