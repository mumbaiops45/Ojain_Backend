

const jwt = require("jsonwebtoken");

// PROTECT – ensures user is authenticated
// const protect = async (req, res, next) => {
//   let token;

//   // CHECK AUTHORIZATION HEADER
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   // FALLBACK: CHECK COOKIE
//   else if (req.cookies && req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // NO TOKEN
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, no token",
//     });
//   }

//   try {
//     // VERIFY TOKEN
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     // SAVE USER DATA
//     req.user = decoded;

//     next();
//   }
//   catch (error) {
//     console.log("JWT ERROR:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, token failed",
//     });
//   }
// };
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No Token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
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
const dealerOnly = (req, res, next) => {
  console.log("ROLE:", req.user.role);

  if (req.user.role === "dealer") {
    console.log("Dealer Authorized");
    return next();
  }

  console.log("Dealer Rejected");

  return res.status(403).json({
    success: false,
    message: "Dealer only",
    role: req.user.role,
  });
};

const vendorOnly = (req, res, next) => {
  if (req.user.role === "vendor") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Vendor only.",
  });
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
  dealerOnly,
  adminOnly,
  vendorOnly,
};