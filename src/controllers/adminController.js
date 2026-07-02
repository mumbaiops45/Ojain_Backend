// // const Admin = require("../models/Admin");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // // Helper to generate both tokens
// // const generateTokens = (id, role) => {
// //   const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
// //   const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
// //   return { accessToken, refreshToken };
// // };

// // // Admin login
// // const adminLogin = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const admin = await Admin.findOne({ email });
// //     if (!admin) return res.status(404).json({ message: "Admin not found" });
// //     const isMatch = await bcrypt.compare(password, admin.password);
// //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// //     const { accessToken, refreshToken } = generateTokens(admin._id, admin.role);
// //     res.cookie("adminRefreshToken", refreshToken, {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "strict",
// //       maxAge: 7 * 24 * 60 * 60 * 1000,
// //     });
// //     res.status(200).json({ message: "Login successful", token: accessToken, admin });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // Refresh token endpoint
// // const refreshAdminToken = async (req, res) => {
// //   const refreshToken = req.cookies.adminRefreshToken;
// //   if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
// //   try {
// //     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
// //     const newAccessToken = jwt.sign(
// //       { id: decoded.id, role: decoded.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "15m" }
// //     );
// //     res.status(200).json({ token: newAccessToken });
// //   } catch (err) {
// //     res.status(403).json({ message: "Invalid refresh token" });
// //   }
// // };

// // // Other admin controller functions (dashboard, vendors, etc.)
// // const getDashboardStats = async (req, res) => {
// //   // implement your logic
// //   res.status(200).json({ message: "Dashboard stats" });
// // };

// // const getPendingVendors = async (req, res) => {
// //   // implement
// //   res.status(200).json([]);
// // };

// // const approveVendor = async (req, res) => {
// //   // implement
// //   res.status(200).json({ message: "Vendor approved" });
// // };

// // const unapproveVendor = async (req, res) => {
// //   // implement
// //   res.status(200).json({ message: "Vendor unapproved" });
// // };

// // const rejectVendor = async (req, res) => {
// //   // implement
// //   res.status(200).json({ message: "Vendor rejected" });
// // };

// // const getAllOrders = async (req, res) => {
// //   res.status(200).json([]);
// // };

// // const getAllProducts = async (req, res) => {
// //   res.status(200).json([]);
// // };

// // const approveProduct = async (req, res) => {
// //   res.status(200).json({ message: "Product approved" });
// // };

// // const rejectProduct = async (req, res) => {
// //   res.status(200).json({ message: "Product rejected" });
// // };

// // const getPayoutSummary = async (req, res) => {
// //   res.status(200).json({});
// // };

// // const markPayoutPaid = async (req, res) => {
// //   res.status(200).json({ message: "Payout marked paid" });
// // };

// // module.exports = {
// //   adminLogin,
// //   refreshAdminToken,
// //   getDashboardStats,
// //   getPendingVendors,
// //   approveVendor,
// //   unapproveVendor,
// //   rejectVendor,
// //   getAllOrders,
// //   getAllProducts,
// //   approveProduct,
// //   rejectProduct,
// //   getPayoutSummary,
// //   markPayoutPaid,
// // };

// const Admin = require("../models/Admin");
// const Vendor = require("../models/Vendor");
// const Product = require("../models/Product");
// const Order = require("../models/Order");
// const User = require("../models/User");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // ==========================================
// // GENERATE TOKENS
// // ==========================================
// const generateTokens = (
//   id,
//   role
// ) => {
//   const accessToken =
//     jwt.sign(
//       { id, role },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "15m",
//       }
//     );

//   const refreshToken =
//     jwt.sign(
//       { id, role },
//       process.env
//         .JWT_REFRESH_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

// // ==========================================
// // ADMIN LOGIN
// // ==========================================
// const adminLogin = async (
//   req,
//   res
// ) => {
//   try {
//     const { email, password } =
//       req.body;

//     const admin =
//       await Admin.findOne({
//         email,
//       });

//     if (!admin) {
//       return res
//         .status(404)
//         .json({
//           success: false,
//           message:
//             "Admin not found",
//         });
//     }

//     const isMatch =
//       await bcrypt.compare(
//         password,
//         admin.password
//       );

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Invalid credentials",
//         });
//     }

//     const {
//       accessToken,
//       refreshToken,
//     } = generateTokens(
//       admin._id,
//       admin.role
//     );

//     // STORE REFRESH TOKEN
//     res.cookie(
//       "adminRefreshToken",
//       refreshToken,
//       {
//         httpOnly: true,
//         secure:
//           process.env
//             .NODE_ENV ===
//           "production",

//         sameSite: "strict",

//         maxAge:
//           7 *
//           24 *
//           60 *
//           60 *
//           1000,
//       }
//     );

//     res.status(200).json({
//       success: true,

//       message:
//         "Admin login successful",

//       token: accessToken,

//       admin,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // REFRESH TOKEN
// // ==========================================
// const refreshAdminToken =
//   async (req, res) => {
//     try {
//       const refreshToken =
//         req.cookies
//           .adminRefreshToken;

//       if (!refreshToken) {
//         return res
//           .status(401)
//           .json({
//             success: false,
//             message:
//               "No refresh token",
//           });
//       }

//       const decoded =
//         jwt.verify(
//           refreshToken,
//           process.env
//             .JWT_REFRESH_SECRET
//         );

//       const newAccessToken =
//         jwt.sign(
//           {
//             id: decoded.id,
//             role:
//               decoded.role,
//           },
//           process.env.JWT_SECRET,
//           {
//             expiresIn:
//               "15m",
//           }
//         );

//       res.status(200).json({
//         success: true,
//         token:
//           newAccessToken,
//       });
//     } catch (error) {
//       res.status(403).json({
//         success: false,
//         message:
//           "Invalid refresh token",
//       });
//     }
//   };

// // ==========================================
// // DASHBOARD STATS
// // ==========================================
// const getDashboardStats =
//   async (req, res) => {
//     try {
//       const totalUsers =
//         await User.countDocuments();

//       const totalVendors =
//         await Vendor.countDocuments();

//       const pendingVendors =
//         await Vendor.countDocuments(
//           {
//             isApproved: false,
//           }
//         );

//       const totalProducts =
//         await Product.countDocuments();

//       const totalOrders =
//         await Order.countDocuments();

//       // TOTAL SALES
//       const salesResult =
//         await Order.aggregate([
//           {
//             $match: {
//               paymentStatus:
//                 "Paid",
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               totalSales: {
//                 $sum:
//                   "$totalAmount",
//               },
//             },
//           },
//         ]);

//       const totalSales =
//         salesResult[0]
//           ?.totalSales || 0;

//       // RECENT ORDERS
//       const recentOrders =
//         await Order.find()
//           .populate(
//             "user",
//             "name email"
//           )
//           .sort({
//             createdAt: -1,
//           })
//           .limit(5);

//       // RECENT USERS
//       const recentUsers =
//         await User.find()
//           .select("-password")
//           .sort({
//             createdAt: -1,
//           })
//           .limit(5);

//       // RECENT VENDORS
//       const recentVendors =
//         await Vendor.find()
//           .sort({
//             createdAt: -1,
//           })
//           .limit(5);

//       res.status(200).json({
//         success: true,

//         stats: {
//           totalUsers,
//           totalVendors,
//           pendingVendors,
//           totalProducts,
//           totalOrders,
//           totalSales,
//         },

//         recentOrders,

//         recentUsers,

//         recentVendors,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // GET PENDING VENDORS
// // ==========================================
// const getPendingVendors =
//   async (req, res) => {
//     try {
//       const vendors =
//         await Vendor.find({
//           isApproved: false,
//         }).sort({
//           createdAt: -1,
//         });

//       res.status(200).json({
//         success: true,
//         vendors,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // APPROVE VENDOR
// // ==========================================
// const approveVendor =
//   async (req, res) => {
//     try {
//       const vendor =
//         await Vendor.findById(
//           req.params.id
//         );

//       if (!vendor) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Vendor not found",
//           });
//       }

//       vendor.isApproved =
//         true;

//       await vendor.save();

//       res.status(200).json({
//         success: true,
//         message:
//           "Vendor approved successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // UNAPPROVE VENDOR
// // ==========================================
// const unapproveVendor =
//   async (req, res) => {
//     try {
//       const vendor =
//         await Vendor.findById(
//           req.params.id
//         );

//       if (!vendor) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Vendor not found",
//           });
//       }

//       vendor.isApproved =
//         false;

//       await vendor.save();

//       res.status(200).json({
//         success: true,
//         message:
//           "Vendor unapproved successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // REJECT VENDOR
// // ==========================================
// const rejectVendor =
//   async (req, res) => {
//     try {
//       const vendor =
//         await Vendor.findById(
//           req.params.id
//         );

//       if (!vendor) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Vendor not found",
//           });
//       }

//       await vendor.deleteOne();

//       res.status(200).json({
//         success: true,
//         message:
//           "Vendor rejected successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // GET ALL PRODUCTS
// // ==========================================
// const getAllProducts =
//   async (req, res) => {
//     try {
//       const products =
//         await Product.find()
//           .populate(
//             "vendor",
//             "shopName"
//           )
//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // APPROVE PRODUCT
// // ==========================================
// const approveProduct =
//   async (req, res) => {
//     try {
//       const product =
//         await Product.findById(
//           req.params.id
//         );

//       if (!product) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Product not found",
//           });
//       }

//       product.isApproved =
//         true;

//       await product.save();

//       res.status(200).json({
//         success: true,
//         message:
//           "Product approved successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // REJECT PRODUCT
// // ==========================================
// const rejectProduct =
//   async (req, res) => {
//     try {
//       const product =
//         await Product.findById(
//           req.params.id
//         );

//       if (!product) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Product not found",
//           });
//       }

//       await product.deleteOne();

//       res.status(200).json({
//         success: true,
//         message:
//           "Product rejected successfully",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // GET ALL ORDERS
// // ==========================================
// const getAllOrders =
//   async (req, res) => {
//     try {
//       const orders =
//         await Order.find()
//           .populate(
//             "user",
//             "name email"
//           )
//           .sort({
//             createdAt: -1,
//           });

//       res.status(200).json({
//         success: true,
//         orders,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // PAYOUT SUMMARY
// // ==========================================
// const getPayoutSummary =
//   async (req, res) => {
//     try {
//       const result =
//         await Order.aggregate([
//           {
//             $match: {
//               paymentStatus:
//                 "Paid",
//             },
//           },
//           {
//             $group: {
//               _id: null,
//               totalRevenue: {
//                 $sum:
//                   "$totalAmount",
//               },
//             },
//           },
//         ]);

//       const totalRevenue =
//         result[0]
//           ?.totalRevenue || 0;

//       res.status(200).json({
//         success: true,
//         totalRevenue,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ==========================================
// // MARK PAYOUT PAID
// // ==========================================
// const markPayoutPaid =
//   async (req, res) => {
//     try {
//       res.status(200).json({
//         success: true,
//         message:
//           "Payout marked paid",
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// module.exports = {
//   adminLogin,
//   refreshAdminToken,

//   getDashboardStats,

//   getPendingVendors,
//   approveVendor,
//   unapproveVendor,
//   rejectVendor,

//   getAllOrders,

//   getAllProducts,
//   approveProduct,
//   rejectProduct,

//   getPayoutSummary,
//   markPayoutPaid,
// };









const Admin = require("../models/Admin");
const Dealer = require("../models/Dealer");  // ← changed from Vendor
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// GENERATE TOKENS (unchanged)
// ==========================================
const generateTokens = (id, role) => {
  const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// ==========================================
// ADMIN LOGIN (unchanged)
// ==========================================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = generateTokens(admin._id, admin.role);
    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: "Admin login successful", token: accessToken, admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// REFRESH TOKEN (unchanged)
// ==========================================
const refreshAdminToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.adminRefreshToken;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: "No refresh token" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ success: true, token: newAccessToken });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

// ==========================================
// DASHBOARD STATS (updated for dealers)
// ==========================================
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDealers = await Dealer.countDocuments();          // ← changed
    const pendingDealers = await Dealer.countDocuments({ isApproved: false }); // ← changed

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const salesResult = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
    ]);
    const totalSales = salesResult[0]?.totalSales || 0;

    const recentOrders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().select("-password").sort({ createdAt: -1 }).limit(5);
    const recentDealers = await Dealer.find().sort({ createdAt: -1 }).limit(5);  // ← changed

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDealers,        // ← changed
        pendingDealers,      // ← changed
        totalProducts,
        totalOrders,
        totalSales,
      },
      recentOrders,
      recentUsers,
      recentDealers,         // ← changed
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// GET PENDING DEALERS (was getPendingVendors)
// ==========================================
const getPendingDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find({ isApproved: false }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, dealers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// APPROVE DEALER (was approveVendor)
// ==========================================
const approveDealer = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }
    dealer.isApproved = true;
    // Optionally generate dealerCode here if needed (e.g., "D-XXXX")
    await dealer.save();
    res.status(200).json({ success: true, message: "Dealer approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// UNAPPROVE DEALER (was unapproveVendor)
// ==========================================
const unapproveDealer = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }
    dealer.isApproved = false;
    await dealer.save();
    res.status(200).json({ success: true, message: "Dealer unapproved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// REJECT DEALER (was rejectVendor)
// ==========================================
const rejectDealer = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ success: false, message: "Dealer not found" });
    }
    await dealer.deleteOne();
    res.status(200).json({ success: true, message: "Dealer rejected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// PRODUCT MANAGEMENT (unchanged – still handles products)
// ==========================================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "shopName").sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    product.isApproved = true;
    await product.save();
    res.status(200).json({ success: true, message: "Product approved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product rejected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ORDER MANAGEMENT (unchanged)
// ==========================================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// PAYOUT SUMMARY (unchanged)
// ==========================================
const getPayoutSummary = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = result[0]?.totalRevenue || 0;
    res.status(200).json({ success: true, totalRevenue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markPayoutPaid = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Payout marked paid" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
  adminLogin,
  refreshAdminToken,

  getDashboardStats,

  getPendingDealers,    // ← renamed
  approveDealer,        // ← renamed
  unapproveDealer,      // ← renamed
  rejectDealer,         // ← renamed

  getAllOrders,

  getAllProducts,
  approveProduct,
  rejectProduct,

  getPayoutSummary,
  markPayoutPaid,
};