// // const Vendor = require("../models/Vendor");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const Order = require("../models/Order");

// // // Helper: generate JWT token
// // const generateToken = (id, role) => {
// //   return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
// // };

// // // ================= REGISTER VENDOR =================
// // // Creates a new vendor account with isApproved = false (pending admin approval).
// // // No token is returned – vendor must wait for admin approval.
// // const registerVendor = async (req, res) => {
// //   try {
// //     const {
// //       fullName,
// //       email,
// //       password,
// //       phone,
// //       shopName,
// //       shopDescription,
// //       city,
// //       bankAccountNumber,
// //       ifscCode,
// //       accountHolderName,
// //       commissionRate,
// //     } = req.body;

// //     const existingVendor = await Vendor.findOne({ email });
// //     if (existingVendor) {
// //       return res.status(400).json({ message: "Vendor already exists" });
// //     }

// //     const vendor = await Vendor.create({
// //       fullName,
// //       email,
// //       password,
// //       phone,
// //       shopName,
// //       shopDescription,
// //       city,
// //       bankAccountNumber,
// //       ifscCode,
// //       accountHolderName,
// //       commissionRate: commissionRate || 10,
// //       // isApproved defaults to false (from schema) – no need to set explicitly
// //     });

// //     res.status(201).json({
// //       message: "Your account is under review. Admin will approve within 24 hours.",
// //       vendorId: vendor._id,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= LOGIN VENDOR =================
// // // Allows login only if vendor is approved (isApproved === true).
// // // Returns JWT token upon successful login.
// // const loginVendor = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const vendor = await Vendor.findOne({ email });

// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
// //     if (!vendor.isApproved) {
// //       return res.status(403).json({ message: "Your account is pending admin approval." });
// //     }

// //     const isMatch = await bcrypt.compare(password, vendor.password);
// //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// //     const token = generateToken(vendor._id, vendor.role);
// //     res.status(200).json({ message: "Login successful", token, vendor });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= GET ALL VENDORS (ADMIN) =================
// // // Returns all vendors (both approved and pending) without password field.
// // const getAllVendors = async (req, res) => {
// //   try {
// //     const vendors = await Vendor.find().select("-password");
// //     res.status(200).json(vendors);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= GET VENDOR BY ID (PUBLIC) =================
// // // Returns a vendor's public info only if they are approved (isApproved === true).
// // const getVendorById = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.findById(req.params.id).select("-password");
// //     if (!vendor || !vendor.isApproved) {
// //       return res.status(404).json({ message: "Vendor not found" });
// //     }
// //     res.status(200).json(vendor);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= UPDATE VENDOR PROFILE (VENDOR ONLY) =================
// // // Vendor can update their own profile (fullName, phone, shopName, etc.).
// // // Uses req.user.id from auth middleware.
// // const updateVendorProfile = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.findById(req.user.id);
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     const allowed = [
// //       "fullName", "phone", "shopName", "shopDescription",
// //       "city", "bankAccountNumber", "ifscCode", "accountHolderName"
// //     ];
// //     allowed.forEach(field => {
// //       if (req.body[field] !== undefined) vendor[field] = req.body[field];
// //     });

// //     const updatedVendor = await vendor.save();
// //     res.status(200).json({ message: "Profile updated", vendor: updatedVendor });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= GET VENDOR EARNINGS (VENDOR ONLY) =================
// // // Calculates total earnings from delivered orders where this vendor is the seller.
// // const getVendorEarnings = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ vendorId: req.user.id, status: "delivered" });
// //     const totalEarnings = orders.reduce((acc, item) => acc + (item.vendorEarning || 0), 0);
// //     res.status(200).json({ totalOrders: orders.length, totalEarnings });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= GET PENDING VENDORS (ADMIN) =================
// // // Returns all vendors where isApproved === false (pending approval).
// // const getPendingVendors = async (req, res) => {
// //   try {
// //     const vendors = await Vendor.find({ isApproved: false }).select("-password");
// //     res.status(200).json(vendors);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // // ================= APPROVE VENDOR (ADMIN) =================
// // // Sets isApproved to true for a given vendor ID.
// // const approveVendor = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.findById(req.params.id);
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     vendor.isApproved = true;
// //     await vendor.save();
// //     res.status(200).json({ message: "Vendor approved successfully", vendor });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// // // ================= UNAPPROVE VENDOR (ADMIN) =================
// // // Sets isApproved back to false for a previously approved vendor.
// // const unapproveVendor = async (req, res) => {
// //   try {
// //     const vendor = await Vendor.findById(req.params.id);
// //     if (!vendor) return res.status(404).json({ message: "Vendor not found" });

// //     vendor.isApproved = false;
// //     await vendor.save();
// //     res.status(200).json({ message: "Vendor unapproved (rejected) successfully", vendor });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // module.exports = {
// //   registerVendor,
// //   loginVendor,
// //   getAllVendors,
// //   getVendorById,
// //   updateVendorProfile,
// //   getVendorEarnings,
// //   getPendingVendors,
// //   approveVendor,
// //   unapproveVendor,
// // };







// const Vendor = require("../models/Vendor");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Order = require("../models/Order");

// // Add this after the existing generateToken (or replace it)
// const generateTokens = (id, role) => {
//   const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
//   const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
//   return { accessToken, refreshToken };
// };

// // ================= REGISTER VENDOR =================
// const registerVendor = async (req, res) => {
//   try {
//     const {
//       fullName, email, password, phone, shopName, shopDescription,
//       city, bankAccountNumber, ifscCode, accountHolderName, commissionRate,
//     } = req.body;

//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

//     const vendor = await Vendor.create({
//       fullName, email, password, phone, shopName, shopDescription,
//       city, bankAccountNumber, ifscCode, accountHolderName,
//       commissionRate: commissionRate || 10,
//       // isApproved defaults to false (from schema)
//     });

//     res.status(201).json({
//       message: "Your account is under review. Admin will approve within 24 hours.",
//       vendorId: vendor._id,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= LOGIN VENDOR =================
// const loginVendor = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const vendor = await Vendor.findOne({ email });
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     if (!vendor.isApproved) {
//       return res.status(403).json({ message: "Your account is pending admin approval." });
//     }
//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const { accessToken, refreshToken } = generateTokens(vendor._id, vendor.role);
//     res.cookie("vendorRefreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     res.status(200).json({ message: "Login successful", token: accessToken, vendor });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET ALL VENDORS (ADMIN) =================
// const getAllVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find().select("-password");
//     res.status(200).json(vendors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET VENDOR BY ID (PUBLIC) =================
// const getVendorById = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id).select("-password");
//     if (!vendor || !vendor.isApproved) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }
//     res.status(200).json(vendor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET VENDOR PROFILE (VENDOR ONLY) =================
// const getVendorProfile = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.user.id).select("-password");
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     res.status(200).json(vendor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // ================= UPDATE VENDOR PROFILE (VENDOR ONLY) =================
// const updateVendorProfile = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.user.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     const allowed = ["fullName", "phone", "shopName", "shopDescription", "city", "bankAccountNumber", "ifscCode", "accountHolderName"];
//     allowed.forEach(field => {
//       if (req.body[field] !== undefined) vendor[field] = req.body[field];
//     });
//     const updatedVendor = await vendor.save();
//     res.status(200).json({ message: "Profile updated", vendor: updatedVendor });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET VENDOR EARNINGS (VENDOR ONLY) =================
// const getVendorEarnings = async (req, res) => {
//   try {
//     const orders = await Order.find({ vendorId: req.user.id, status: "delivered" });
//     const totalEarnings = orders.reduce((acc, item) => acc + (item.vendorEarning || 0), 0);
//     res.status(200).json({ totalOrders: orders.length, totalEarnings });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= GET PENDING VENDORS (ADMIN) =================
// const getPendingVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find({ isApproved: false }).select("-password");
//     res.status(200).json(vendors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= APPROVE VENDOR (ADMIN) =================
// const approveVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     vendor.isApproved = true;
//     await vendor.save();
//     res.status(200).json({ message: "Vendor approved successfully", vendor });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= UNAPPROVE VENDOR (ADMIN) =================
// const unapproveVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     vendor.isApproved = false;
//     await vendor.save();
//     res.status(200).json({ message: "Vendor unapproved (rejected) successfully", vendor });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= UPDATE VENDOR (ADMIN) =================
// const updateVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     const allowed = ["fullName", "email", "phone", "shopName", "city"];
//     allowed.forEach(field => {
//       if (req.body[field] !== undefined) vendor[field] = req.body[field];
//     });
//     const updatedVendor = await vendor.save();
//     res.status(200).json({ message: "Vendor updated", vendor: updatedVendor });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ================= DELETE VENDOR (ADMIN) =================
// const rejectVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     await vendor.deleteOne();
//     res.status(200).json({ message: "Vendor deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const refreshVendorToken = async (req, res) => {
//   const refreshToken = req.cookies.vendorRefreshToken;
//   if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const newAccessToken = jwt.sign(
//       { id: decoded.id, role: decoded.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );
//     res.status(200).json({ token: newAccessToken });
//   } catch (err) {
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// };

// module.exports = {
//   registerVendor,
//   loginVendor,
//   getAllVendors,
//   getVendorById,
//   updateVendorProfile,
//   getVendorEarnings,
//   getPendingVendors,
//   approveVendor,
//   unapproveVendor,
//   updateVendor,
//   rejectVendor,
//   getVendorProfile,
//   refreshVendorToken,
// };

const Vendor = require("../models/Vendor");

const Product = require("../models/Product");

const Order = require("../models/Order");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// ==========================================
// GENERATE TOKENS
// ==========================================
const generateTokens = (
  id,
  role
) => {
  const accessToken =
    jwt.sign(
      { id, role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

  const refreshToken =
    jwt.sign(
      { id, role },
      process.env
        .JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

  return {
    accessToken,
    refreshToken,
  };
};

// ==========================================
// REGISTER VENDOR
// ==========================================
const registerVendor =
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        password,
        phone,
        shopName,
        shopDescription,
        city,
        bankAccountNumber,
        ifscCode,
        accountHolderName,
        commissionRate,
      } = req.body;

      const existingVendor =
        await Vendor.findOne({
          email,
        });

      if (existingVendor) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Vendor already exists",
          });
      }

      const vendor =
        await Vendor.create({
          fullName,
          email,
          password,
          phone,
          shopName,
          shopDescription,
          city,
          bankAccountNumber,
          ifscCode,
          accountHolderName,

          commissionRate:
            commissionRate ||
            10,
        });

      res.status(201).json({
        success: true,

        message:
          "Vendor account created successfully",

        vendorId: vendor._id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// LOGIN VENDOR
// ==========================================
const loginVendor =
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      const vendor =
        await Vendor.findOne({
          email,
        });

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      if (!vendor.isApproved) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Vendor approval pending",
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          vendor.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid credentials",
          });
      }

      const {
        accessToken,
        refreshToken,
      } = generateTokens(
        vendor._id,
        vendor.role
      );

      // STORE REFRESH TOKEN
      res.cookie(
        "vendorRefreshToken",
        refreshToken,
        {
          httpOnly: true,

          secure:
            process.env
              .NODE_ENV ===
            "production",

          sameSite:
            "strict",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      );

      res.status(200).json({
        success: true,

        message:
          "Vendor login successful",

        token:
          accessToken,

        vendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// REFRESH TOKEN
// ==========================================
const refreshVendorToken =
  async (req, res) => {
    try {
      const refreshToken =
        req.cookies
          .vendorRefreshToken;

      if (!refreshToken) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "No refresh token",
          });
      }

      const decoded =
        jwt.verify(
          refreshToken,
          process.env
            .JWT_REFRESH_SECRET
        );

      const newAccessToken =
        jwt.sign(
          {
            id: decoded.id,
            role:
              decoded.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn:
              "15m",
          }
        );

      res.status(200).json({
        success: true,

        token:
          newAccessToken,
      });
    } catch (error) {
      res.status(403).json({
        success: false,
        message:
          "Invalid refresh token",
      });
    }
  };

// ==========================================
// VENDOR DASHBOARD
// ==========================================
const getVendorDashboard =
  async (req, res) => {
    try {
      const vendorId =
        req.user.id;

      // TOTAL PRODUCTS
      const totalProducts =
        await Product.countDocuments(
          {
            vendor:
              vendorId,
          }
        );

      // TOTAL ORDERS
      const totalOrders =
        await Order.countDocuments(
          {
            vendorId:
              vendorId,
          }
        );

      // PENDING ORDERS
      const pendingOrders =
        await Order.countDocuments(
          {
            vendorId:
              vendorId,

            orderStatus:
              "Placed",
          }
        );

      // TOTAL SALES
      const salesResult =
        await Order.aggregate([
          {
            $match: {
              vendorId:
                vendorId,

              paymentStatus:
                "Paid",
            },
          },
          {
            $group: {
              _id: null,

              totalSales:
                {
                  $sum:
                    "$totalAmount",
                },
            },
          },
        ]);

      const totalSales =
        salesResult[0]
          ?.totalSales || 0;

      // RECENT PRODUCTS
      const recentProducts =
        await Product.find({
          vendor: vendorId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      // RECENT ORDERS
      const recentOrders =
        await Order.find({
          vendorId:
            vendorId,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.status(200).json({
        success: true,

        stats: {
          totalProducts,
          totalOrders,
          pendingOrders,
          totalSales,
        },

        recentProducts,

        recentOrders,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// GET ALL VENDORS
// ==========================================
const getAllVendors =
  async (req, res) => {
    try {
      const vendors =
        await Vendor.find()
          .select(
            "-password"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        vendors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// GET SINGLE VENDOR
// ==========================================
const getVendorById =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.params.id
        ).select(
          "-password"
        );

      if (
        !vendor ||
        !vendor.isApproved
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      res.status(200).json({
        success: true,
        vendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// GET VENDOR PROFILE
// ==========================================
const getVendorProfile =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.user.id
        ).select(
          "-password"
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      res.status(200).json({
        success: true,
        vendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// UPDATE VENDOR PROFILE
// ==========================================
const updateVendorProfile =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.user.id
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      const allowed = [
        "fullName",
        "phone",
        "shopName",
        "shopDescription",
        "city",
        "bankAccountNumber",
        "ifscCode",
        "accountHolderName",
      ];

      allowed.forEach(
        (field) => {
          if (
            req.body[
              field
            ] !==
            undefined
          ) {
            vendor[
              field
            ] =
              req.body[
                field
              ];
          }
        }
      );

      const updatedVendor =
        await vendor.save();

      res.status(200).json({
        success: true,

        message:
          "Profile updated successfully",

        vendor:
          updatedVendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// GET VENDOR EARNINGS
// ==========================================
const getVendorEarnings =
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          vendorId:
            req.user.id,

          orderStatus:
            "Delivered",
        });

      const totalEarnings =
        orders.reduce(
          (
            acc,
            item
          ) =>
            acc +
            (item.vendorEarning ||
              0),
          0
        );

      res.status(200).json({
        success: true,

        totalOrders:
          orders.length,

        totalEarnings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// GET PENDING VENDORS
// ==========================================
const getPendingVendors =
  async (req, res) => {
    try {
      const vendors =
        await Vendor.find({
          isApproved: false,
        }).select(
          "-password"
        );

      res.status(200).json({
        success: true,
        vendors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// APPROVE VENDOR
// ==========================================
const approveVendor =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.params.id
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      vendor.isApproved =
        true;

      await vendor.save();

      res.status(200).json({
        success: true,

        message:
          "Vendor approved successfully",

        vendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// UNAPPROVE VENDOR
// ==========================================
const unapproveVendor =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.params.id
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      vendor.isApproved =
        false;

      await vendor.save();

      res.status(200).json({
        success: true,

        message:
          "Vendor unapproved successfully",

        vendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// UPDATE VENDOR
// ==========================================
const updateVendor =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.params.id
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      const allowed = [
        "fullName",
        "email",
        "phone",
        "shopName",
        "city",
      ];

      allowed.forEach(
        (field) => {
          if (
            req.body[
              field
            ] !==
            undefined
          ) {
            vendor[
              field
            ] =
              req.body[
                field
              ];
          }
        }
      );

      const updatedVendor =
        await vendor.save();

      res.status(200).json({
        success: true,

        message:
          "Vendor updated successfully",

        vendor:
          updatedVendor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// ==========================================
// DELETE VENDOR
// ==========================================
const rejectVendor =
  async (req, res) => {
    try {
      const vendor =
        await Vendor.findById(
          req.params.id
        );

      if (!vendor) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Vendor not found",
          });
      }

      await vendor.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Vendor deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  registerVendor,
  loginVendor,

  refreshVendorToken,

  getVendorDashboard,

  getAllVendors,
  getVendorById,

  getVendorProfile,
  updateVendorProfile,

  getVendorEarnings,

  getPendingVendors,
  approveVendor,
  unapproveVendor,

  updateVendor,
  rejectVendor,
};