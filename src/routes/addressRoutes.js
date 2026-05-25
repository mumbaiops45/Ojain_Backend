const express = require("express");

const router = express.Router();

const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} = require(
  "../controllers/addressController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

// ALL ROUTES PROTECTED
router.use(protect);

// GET + CREATE
router
  .route("/")
  .get(getAddresses)
  .post(createAddress);

// UPDATE + DELETE
router
  .route("/:id")
  .put(updateAddress)
  .delete(deleteAddress);

module.exports = router;