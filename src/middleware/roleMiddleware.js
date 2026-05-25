const customerOnly = (req, res, next) => {
  if (req.user.role === "customer") {
    next();
  } else {
    res.status(403).json({
      message: "Customer only",
    });
  }
};

const vendorOnly = (req, res, next) => {
  if (req.user.role === "vendor") {
    next();
  } else {
    res.status(403).json({
      message: "Vendor only",
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Admin only",
    });
  }
};

module.exports = {
  customerOnly,
  vendorOnly,
  adminOnly,
};