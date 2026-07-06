// const Dealer = require("../models/Dealer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const generateTokens = (id, role) => {
//   const accessToken = jwt.sign(
//     { id, role },
//     process.env.JWT_SECRET,
//     { expiresIn: "180m" }
//   );
//   const refreshToken = jwt.sign(
//     { id, role },
//     process.env.JWT_REFRESH_SECRET,
//     { expiresIn: "7d" }
//   );
//   return { accessToken, refreshToken };
// };

// // ============================================
// // REGISTER DEALER
// // ============================================
// const registerDealer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       password,
//       phone,
//       city,
//       bankName,
//       accountHolderName,
//       accountNumber,
//       ifscCode,
//     } = req.body;

//     if (!fullName || !email || !password || !phone || !city) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields.",
//       });
//     }

//     const existingDealer = await Dealer.findOne({ email });
//     if (existingDealer) {
//       return res.status(400).json({
//         success: false,
//         message: "Dealer already exists.",
//       });
//     }

//     const dealer = await Dealer.create({
//       fullName,
//       email,
//       password,
//       phone,
//       city,
//       bankName,
//       accountHolderName,
//       accountNumber,
//       ifscCode,
//       isApproved: false,
//       // dealerCode is omitted – will be assigned by admin
//     });

//     res.status(201).json({
//       success: true,
//       message: "Dealer registered successfully. Waiting for admin approval.",
//       dealerId: dealer._id,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ============================================
// // LOGIN DEALER
// // ============================================
// const loginDealer = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const dealer = await Dealer.findOne({ email });

//     if (!dealer) {
//       return res.status(404).json({
//         success: false,
//         message: "Dealer not found.",
//       });
//     }

//     if (!dealer.isApproved) {
//       return res.status(403).json({
//         success: false,
//         message: "Your account is waiting for admin approval.",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, dealer.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password.",
//       });
//     }

//     const { accessToken, refreshToken } = generateTokens(dealer._id, dealer.role);

//     res.cookie("dealerRefreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful.",
//       token: accessToken,
//       dealer: {
//         _id: dealer._id,
//         fullName: dealer.fullName,
//         email: dealer.email,
//         phone: dealer.phone,
//         city: dealer.city,
//         dealerCode: dealer.dealerCode,
//         walletBalance: dealer.walletBalance,
//         commissionRate: dealer.commissionRate,
//         role: dealer.role,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ============================================
// // REFRESH TOKEN
// // ============================================
// const refreshDealerToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.dealerRefreshToken;

//     if (!refreshToken) {
//       return res.status(401).json({
//         success: false,
//         message: "Refresh token missing.",
//       });
//     }

//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     const accessToken = jwt.sign(
//       { id: decoded.id, role: decoded.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     res.status(200).json({
//       success: true,
//       token: accessToken,
//     });
//   } catch (error) {
//     res.status(403).json({
//       success: false,
//       message: "Invalid refresh token.",
//     });
//   }
// };

// // ============================================
// // LOGOUT DEALER
// // ============================================
// const logoutDealer = async (req, res) => {
//   res.clearCookie("dealerRefreshToken");
//   res.status(200).json({
//     success: true,
//     message: "Logout successful.",
//   });
// };


// const verifyDealer = async (req, res) => {

//   const { dealerCode } = req.body;

//   const dealer = await Dealer.findOne({
//     dealerCode,
//     isApproved: true,
//   });

//   if (!dealer) {
//     return res.status(404).json({
//       success: false,
//       message: "Invalid Dealer Code",
//     });
//   }

//   res.json({
//     success: true,
//     dealer: {
//       id: dealer._id,
//       name: dealer.fullName,
//       dealerCode: dealer.dealerCode,
//       commissionRate: dealer.commissionRate,
//     },
//   });
// };


// module.exports = {
//   registerDealer,
//   loginDealer,
//   refreshDealerToken,
//   logoutDealer,
//   verifyDealer,
// };


const Dealer = require("../models/Dealer");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateTokens = (id, role) => {
  const accessToken = jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "180m" }
  );
  const refreshToken = jwt.sign(
    { id, role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

// ============================================
// REGISTER DEALER
// ============================================
const registerDealer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      city,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
    } = req.body;

    if (!fullName || !email || !password || !phone || !city) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingDealer = await Dealer.findOne({ email });
    if (existingDealer) {
      return res.status(400).json({
        success: false,
        message: "Dealer already exists.",
      });
    }

    const dealer = await Dealer.create({
      fullName,
      email,
      password,
      phone,
      city,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      isApproved: false,
      // dealerCode is omitted – will be assigned by admin
    });

    res.status(201).json({
      success: true,
      message: "Dealer registered successfully. Waiting for admin approval.",
      dealerId: dealer._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// LOGIN DEALER
// ============================================
const loginDealer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dealer = await Dealer.findOne({ email });

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found.",
      });
    }

    if (!dealer.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your account is waiting for admin approval.",
      });
    }

    const isMatch = await bcrypt.compare(password, dealer.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const { accessToken, refreshToken } = generateTokens(dealer._id, dealer.role);

    res.cookie("dealerRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: accessToken,
      dealer: {
        _id: dealer._id,
        fullName: dealer.fullName,
        email: dealer.email,
        phone: dealer.phone,
        city: dealer.city,
        dealerCode: dealer.dealerCode,
        walletBalance: dealer.walletBalance,
        commissionRate: dealer.commissionRate,
        role: dealer.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// REFRESH TOKEN
// ============================================
const refreshDealerToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.dealerRefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing.",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      token: accessToken,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid refresh token.",
    });
  }
};

// ============================================
// LOGOUT DEALER
// ============================================
const logoutDealer = async (req, res) => {
  res.clearCookie("dealerRefreshToken");
  res.status(200).json({
    success: true,
    message: "Logout successful.",
  });
};

// ============================================
// VERIFY DEALER CODE (public)
// ============================================
const verifyDealer = async (req, res) => {
  const { dealerCode } = req.body;

  const dealer = await Dealer.findOne({
    dealerCode,
    isApproved: true,
  });

  if (!dealer) {
    return res.status(404).json({
      success: false,
      message: "Invalid Dealer Code",
    });
  }

  res.json({
    success: true,
    dealer: {
      id: dealer._id,
      name: dealer.fullName,
      dealerCode: dealer.dealerCode,
      commissionRate: dealer.commissionRate,
    },
  });
};

// ============================================
// GET DEALER PROFILE (protected)
// ============================================
const getDealerProfile = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.user.id).select("-password");
    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found",
      });
    }
    res.status(200).json({
      success: true,
      dealer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// UPDATE DEALER PROFILE (protected)
// ============================================
const updateDealerProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      city,
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      profileImage,
    } = req.body || {};

    const dealer = await Dealer.findById(req.user.id);
    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found",
      });
    }

    if (fullName) dealer.fullName = fullName;
    if (phone) dealer.phone = phone;
    if (city) dealer.city = city;
    if (bankName) dealer.bankName = bankName;
    if (accountHolderName) dealer.accountHolderName = accountHolderName;
    if (accountNumber) dealer.accountNumber = accountNumber;
    if (ifscCode) dealer.ifscCode = ifscCode;
    if (profileImage) dealer.profileImage = profileImage;

    await dealer.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      dealer: dealer.toObject({ versionKey: false }),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET DEALER DASHBOARD (protected)
// ============================================
const getDealerDashboard = async (req, res) => {
  try {
    const dealerId = req.user.id;

    const dealer = await Dealer.findById(dealerId).select(
      "walletBalance totalCommission totalOrders referralCount commissionRate fullName dealerCode"
    );

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found",
      });
    }

    const recentOrders = await Order.find({ dealer: dealerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .select("totalAmount orderStatus createdAt");

    res.status(200).json({
      success: true,
      dashboard: {
        stats: {
          walletBalance: dealer.walletBalance,
          totalCommission: dealer.totalCommission,
          totalOrders: dealer.totalOrders,
          referralCount: dealer.referralCount,
          commissionRate: dealer.commissionRate,
        },
        dealerInfo: {
          fullName: dealer.fullName,
          dealerCode: dealer.dealerCode,
        },
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET DEALER EARNINGS (protected)
// ============================================
const getDealerEarnings = async (req, res) => {
  try {
    const dealerId = req.user.id;

    const dealer = await Dealer.findById(dealerId).select(
      "walletBalance totalCommission totalOrders referralCount commissionRate"
    );

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found",
      });
    }

    const orders = await Order.find({ dealer: dealerId })
      .sort({ createdAt: -1 })
      .select("totalAmount dealerCommission createdAt orderStatus");

    const totalEarnings = orders.reduce((sum, o) => sum + (o.dealerCommission || 0), 0);

    res.status(200).json({
      success: true,
      earnings: {
        walletBalance: dealer.walletBalance,
        totalCommission: dealer.totalCommission,
        totalOrders: dealer.totalOrders,
        referralCount: dealer.referralCount,
        commissionRate: dealer.commissionRate,
        totalEarnings,
        orderHistory: orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerDealer,
  loginDealer,
  refreshDealerToken,
  logoutDealer,
  verifyDealer,
  getDealerProfile,
  updateDealerProfile,
  getDealerDashboard,
  getDealerEarnings,
};