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