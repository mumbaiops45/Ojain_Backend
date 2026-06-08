const multer = require("multer");
const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary =
  require("../config/cloudinary");

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => ({
      folder: "products",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      public_id: `product-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`,
    }),
  });

module.exports = multer({
  storage,
});