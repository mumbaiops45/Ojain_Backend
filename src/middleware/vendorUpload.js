// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // CREATE FOLDER
// const uploadDir =
//   "uploads/vendors";

// if (
//   !fs.existsSync(uploadDir)
// ) {
//   fs.mkdirSync(uploadDir, {
//     recursive: true,
//   });
// }

// // STORAGE
// const storage =
//   multer.diskStorage({
//     destination: (
//       req,
//       file,
//       cb
//     ) => {
//       cb(
//         null,
//         uploadDir
//       );
//     },

//     filename: (
//       req,
//       file,
//       cb
//     ) => {
//       const unique =
//         Date.now() +
//         "-" +
//         Math.round(
//           Math.random() *
//             1e9
//         );

//       const ext =
//         path.extname(
//           file.originalname
//         );

//       cb(
//         null,
//         `vendor-${unique}${ext}`
//       );
//     },
//   });

// // FILE FILTER
// const fileFilter = (
//   req,
//   file,
//   cb
// ) => {
//   const allowed =
//     /jpeg|jpg|png|webp/;

//   const extname =
//     allowed.test(
//       path
//         .extname(
//           file.originalname
//         )
//         .toLowerCase()
//     );

//   const mimetype =
//     allowed.test(
//       file.mimetype
//     );

//   if (
//     extname &&
//     mimetype
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Only images allowed"
//       )
//     );
//   }
// };

// // MULTER
// const uploadVendorImage =
//   multer({
//     storage,

//     limits: {
//       fileSize:
//         5 *
//         1024 *
//         1024,
//     },

//     fileFilter,
//   });

// module.exports =
//   uploadVendorImage;

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
      folder: "vendors",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],


      public_id:
        `vendor-${Date.now()}`
    }),
  });

const upload = multer({
  storage,
});

module.exports = upload;