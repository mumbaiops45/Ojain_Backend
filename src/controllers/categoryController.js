// const Category = require("../models/Category");
// const imagePath = req.file.path.replace(/\\/g, "/");

// // CREATE CATEGORY (with file upload)
// // const createCategory = async (req, res) => {
// //   try {
// //     console.log("BODY:", req.body);
// //     console.log("FILE:", req.file);
// //     const { name, description } = req.body;

// //     // const imageUrl = req.file
// //     //   ? `${req.protocol}://${req.get("host")}/${req.file.path}`
// //     //   : "";
// //     const imageUrl = req.file
// //   ? `${req.protocol}://${req.get("host")}/${imagePath}`
// //   : "";

// //     if (!name || !description || !imageUrl) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields required",
// //       });
// //     }

// //     const category = await Category.create({
// //       name,
// //       description,
// //       image: imageUrl,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       category,
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// const createCategory = async (req, res) => {
//   try {

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const { name, description } = req.body;

//     // CHECK REQUIRED FIELDS
//     if (!name || !description || !req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // FIX WINDOWS PATH SLASHES
//     const imagePath =
//       req.file.path.replace(/\\/g, "/");

//     // CREATE FULL IMAGE URL
//     const imageUrl =
//       `${req.protocol}://${req.get("host")}/${imagePath}`;

//     // CREATE CATEGORY
//     const category = await Category.create({
//       name,
//       description,
//       image: imageUrl,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Category created successfully",
//       category,
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // GET ALL CATEGORIES
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });
//     return res.status(200).json({
//       success: true,
//       count: categories.length,
//       categories,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // GET SINGLE CATEGORY
// const getSingleCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }
//     return res.status(200).json({ success: true, category });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // UPDATE CATEGORY
// const updateCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const updateData = { name, description };
//     // if (req.file) {
//     //   updateData.image = req.file.path;
//     // }
//     if (req.file) {
//       updateData.image =
//         `${req.protocol}://${req.get("host")}/${req.file.path}`;
//     }
//     // const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
//     //   new: true,
//     //   runValidators: true,
//     // });
//     const category = await Category.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       {
//         returnDocument: "after",
//         runValidators: true,
//       }
//     );
//     if (!category) {
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }
//     return res.status(200).json({ success: true, message: "Category updated", category });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // DELETE CATEGORY
// const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndDelete(req.params.id);
//     if (!category) {
//       return res.status(404).json({ success: false, message: "Category not found" });
//     }
//     return res.status(200).json({ success: true, message: "Category deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   createCategory,
//   getAllCategories,
//   getSingleCategory,
//   updateCategory,
//   deleteCategory,
// };

const Category = require("../models/Category");

// ======================================
// CREATE CATEGORY
// ======================================

const createCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CLOUDINARY URL
    const imageUrl = req.file.path;

    const category = await Category.create({
      name,
      description,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// UPDATE CATEGORY
// ======================================

const updateCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    const updateData = {
      name,
      description,
    };

    // CLOUDINARY IMAGE
    if (req.file) {
      updateData.image = req.file.path;
    }

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};  

// ======================================
// GET ALL CATEGORIES
// ======================================

const getAllCategories = async (req, res) => {
  try {

    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE CATEGORY
// ======================================

const getSingleCategory = async (req, res) => {
  try {

    const category =
      await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE CATEGORY
// ======================================

const deleteCategory = async (req, res) => {
  try {

    const category =
      await Category.findByIdAndDelete(
        req.params.id
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getSingleCategory,
  deleteCategory,
};