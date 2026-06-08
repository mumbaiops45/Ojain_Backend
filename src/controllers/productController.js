const Product = require("../models/Product");
const Category = require("../models/Category");
// ================= CREATE PRODUCT =================
// const createProduct = async (req, res) => {
//   try {
//     // check category exists
//     const categoryExists = await Category.findById(
//       req.body.category
//     );

//     if (!categoryExists) {
//       return res.status(400).json({
//         message: "Invalid category",
//       });
//     }

//     // create product
//     const product = await Product.create({
//       ...req.body,
//       vendorId: req.user.id,
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// const createProduct = async (
//   req,
//   res
// ) => {
//   try {
//     const categoryExists =
//       await Category.findById(
//         req.body.category
//       );

//     if (!categoryExists) {
//       return res.status(400).json({
//         message:
//           "Invalid category",
//       });
//     }

//     const images =
//       req.files?.map(
//         (file) => file.path
//       ) || [];

//     const product =
//       await Product.create({
//         ...req.body,

//         vendorId:
//           req.user.id,

//         images,
//       });

//     res.status(201).json({
//       message:
//         "Product created successfully",

//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.message,
//     });
//   }
// };

const createProduct = async (
  req,
  res
) => {
  try {

    const categoryExists =
      await Category.findById(
        req.body.category
      );

    if (!categoryExists) {
      return res.status(400).json({
        message:
          "Invalid category",
      });
    }

    let images = [];

    if (
      req.files &&
      req.files.length > 0
    ) {
      images = req.files.map(
        (file) => file.path
      );
    } else if (
      req.body.images &&
      Array.isArray(req.body.images)
    ) {
      images = req.body.images;
    }

    // console.log(req.body);
    // console.log(images);

    const product =
      await Product.create({
        ...req.body,
        vendorId:
          req.user?.id ||
          req.body.vendorId,
        images,
      });

    res.status(201).json({
      message:
        "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};
// ================= GET ALL PRODUCTS =================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("vendorId", "name email")
      .populate("category", "name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PRODUCT BY ID =================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    )
      .populate("vendorId", "name email")
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(
//       req.params.id
//     );

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     const updatedProduct =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );

//     res.status(200).json({
//       message: "Product updated successfully",
//       updatedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    let images = product.images;

    if (
      req.files &&
      req.files.length > 0
    ) {
      images = req.files.map(
        (file) => file.path
      );
    } else if (
      req.body.images &&
      Array.isArray(req.body.images)
    ) {
      images = req.body.images;
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          images,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message:
        "Product updated successfully",

      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};
// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET VENDOR PRODUCTS =================
const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({
      vendorId: req.user.id,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= APPROVE PRODUCT =================
const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isApproved = true;

    await product.save();

    res.status(200).json({
      message: "Product approved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ================= GET PRODUCTS BY CATEGORY =================

const getProductsByCategory =
  async (req, res) => {
    try {

      const products =
        await Product.find({
          category:
            req.params.categoryId,

          isApproved: true,
        })
          .populate(
            "category",
            "name"
          )
          .populate(
            "vendorId",
            "fullName"
          );

      res.status(200).json(
        products
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  approveProduct,
  getProductsByCategory,
};