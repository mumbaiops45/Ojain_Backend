const Dealer = require("../models/Dealer");
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

module.exports = {
  registerDealer,
  loginDealer,
  refreshDealerToken,
  logoutDealer,
};