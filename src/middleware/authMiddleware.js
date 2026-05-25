  // // =============================================
  // // src/middleware/authMiddleware.js
  // // =============================================

  // const jwt = require("jsonwebtoken");

  // // PROTECT – ensures user is authenticated
  // const protect = async (req, res, next) => {
  //   let token;

  //   // 1. Check for token in Authorization header
  //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  //     token = req.headers.authorization.split(" ")[1];
  //   }

  //   // 2. If no token, reject immediately
  //   if (!token) {
  //     return res.status(401).json({ message: "Not authorized, no token" });
  //   }

  //   try {
  //     // 3. Verify token
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded;   // expects { id: userId, role: 'customer'/'vendor'/'admin', ... }
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }
  // };

  // // CUSTOMER ONLY
  // const customerOnly = (req, res, next) => {
  //   if (req.user.role === "customer") {
  //     next();
  //   } else {
  //     return res.status(403).json({ message: "Customer only" });
  //   }
  // };

  // // VENDOR ONLY
  // const vendorOnly = (req, res, next) => {
  //   if (req.user.role === "vendor") {
  //     next();
  //   } else {
  //     return res.status(403).json({ message: "Vendor only" });
  //   }
  // };

  // // ADMIN ONLY
  // const adminOnly = (req, res, next) => {
  //   if (req.user.role === "admin") {
  //     next();
  //   } else {
  //     return res.status(403).json({ message: "Admin only" });
  //   }
  // };

  // module.exports = {
  //   protect,
  //   customerOnly,
  //   vendorOnly,
  //   adminOnly,
  // };


  const jwt = require("jsonwebtoken");

  // PROTECT – ensures user is authenticated
  const protect = async (req, res, next) => {
    let token;

    // CHECK AUTH HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    try {
      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // SAVE USER DATA
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };

  // CUSTOMER ONLY
  const customerOnly = (req, res, next) => {
    if (req.user.role === "customer") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Customer only",
      });
    }
  };

  // VENDOR ONLY
  const vendorOnly = (req, res, next) => {
    if (req.user.role === "vendor") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Vendor only",
      });
    }
  };

  // ADMIN ONLY
  const adminOnly = (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Admin only",
      });
    }
  };

  module.exports = {
    protect,
    customerOnly,
    vendorOnly,
    adminOnly,
  };