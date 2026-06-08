// // =============================================
// // src/controllers/authController.js
// // =============================================

// const User =
//   require("../models/User");

// const Vendor =
//   require("../models/Vendor");

// const bcrypt =
//   require("bcryptjs");

// const jwt =
//   require("jsonwebtoken");

// // GENERATE TOKEN
// const generateToken = (
//   id,
//   role
// ) => {
//   return jwt.sign(
//     {
//       id,
//       role,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "30d",
//     }
//   );
// };

// // CUSTOMER REGISTER
// const registerCustomer =
//   async (req, res) => {
//     try {
//       const {
//         name,
//         email,
//         password,
//         phone,
//       } = req.body;

//       const existingUser =
//         await User.findOne({
//           email,
//         });

//       if (existingUser) {
//         return res.status(400).json({
//           message:
//             "Customer already exists",
//         });
//       }

//       const user =
//         await User.create({
//           name,
//           email,
//           password,
//           phone,
//           role: "customer",
//         });

//       res.status(201).json({
//         success: true,

//         token: generateToken(
//           user._id,
//           user.role
//         ),

//         user,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// // CUSTOMER LOGIN
// const loginCustomer =
//   async (req, res) => {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;

//       const user =
//         await User.findOne({
//           email,
//           role: "customer",
//         });

//       if (!user) {
//         return res.status(404).json({
//           message:
//             "Customer not found",
//         });
//       }

//       const isMatch =
//         await bcrypt.compare(
//           password,
//           user.password
//         );

//       if (!isMatch) {
//         return res.status(400).json({
//           message:
//             "Invalid credentials",
//         });
//       }

//       res.status(200).json({
//         success: true,

//         token: generateToken(
//           user._id,
//           user.role
//         ),

//         user,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// // VENDOR REGISTER
// const registerVendor =
//   async (req, res) => {
//     try {
//       const {
//         fullName,
//         email,
//         password,
//         phone,
//         shopName,
//         shopDescription,
//         city,
//         bankAccountNumber,
//         ifscCode,
//         accountHolderName,
//       } = req.body;

//       const existingVendor =
//         await Vendor.findOne({
//           email,
//         });

//       if (existingVendor) {
//         return res.status(400).json({
//           message:
//             "Vendor already exists",
//         });
//       }

//       const vendor =
//         await Vendor.create({
//           fullName,

//           email,

//           password,

//           phone,

//           shopName,

//           shopDescription,

//           city,

//           bankAccountNumber,

//           ifscCode,

//           accountHolderName,

//           isApproved: false,
//         });

//       res.status(201).json({
//         success: true,

//         message:
//           "Vendor registered successfully",

//         vendor,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// // VENDOR LOGIN
// const loginVendor =
//   async (req, res) => {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;

//       const vendor =
//         await Vendor.findOne({
//           email,
//         });

//       if (!vendor) {
//         return res.status(404).json({
//           message:
//             "Vendor not found",
//         });
//       }

//       if (
//         !vendor.isApproved
//       ) {
//         return res.status(403).json({
//           message:
//             "Vendor approval pending",
//         });
//       }

//       const isMatch =
//         await bcrypt.compare(
//           password,
//           vendor.password
//         );

//       if (!isMatch) {
//         return res.status(400).json({
//           message:
//             "Invalid credentials",
//         });
//       }

//       res.status(200).json({
//         success: true,

//         token: generateToken(
//           vendor._id,
//           vendor.role
//         ),

//         vendor,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

// // ADMIN LOGIN

// const adminLogin =
//   async (req, res) => {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;

//       // TEMP ADMIN LOGIN
//       if (
//         email ===
//           "admin@gmail.com" &&
//         password ===
//           "Admin@123"
//       ) {
//         const admin = {
//           _id:
//             "64f1c2a9b123456789abcd12",

//           name:
//             "Super Admin",

//           email:
//             "admin@gmail.com",

//           role: "admin",
//         };

//         const token =
//           jwt.sign(
//             {
//               id: admin._id,
//               role: admin.role,
//             },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: "30d",
//             }
//           );

//         return res.status(200).json({
//           success: true,

//           message:
//             "Admin login successful",

//           token,

//           admin,
//         });
//       }

//       return res.status(400).json({
//         success: false,

//         message:
//           "Invalid admin credentials",
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };
// // const adminLogin =
// //   async (req, res) => {
// //     try {
// //       const {
// //         email,
// //         password,
// //       } = req.body;

// //       if (
// //         email ===
// //           "admin@gmail.com" &&
// //         password ===
// //           "Admin@123"
// //       ) {
// //         const admin = {
// //           _id:
// //             "64f1c2a9b123456789abcd12",

// //           name:
// //             "Super Admin",

// //           email:
// //             "admin@gmail.com",

// //           role: "admin",
// //         };

// //         return res.status(200).json({
// //           success: true,

// //           token: generateToken(
// //             admin._id,
// //             admin.role
// //           ),

// //           admin,
// //         });
// //       }

// //       return res.status(400).json({
// //         message:
// //           "Invalid admin credentials",
// //       });
// //     } catch (error) {
// //       res.status(500).json({
// //         message: error.message,
// //       });
// //     }
// //   };

// // LOGOUT
// const logoutUser =
//   async (req, res) => {
//     res.status(200).json({
//       success: true,

//       message:
//         "Logged out successfully",
//     });
//   };

// module.exports = {
//   registerCustomer,
//   loginCustomer,

//   registerVendor,
//   loginVendor,

//   adminLogin,

//   logoutUser,
// };

const User = require("../models/User");

const Vendor = require("../models/Vendor");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// GENERATE JWT TOKEN
const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

//
// CUSTOMER REGISTER
//
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Customer already exists",
      });
    }

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "customer",
    });

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",

      token: generateToken(user._id, user.role),

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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

//
// CUSTOMER LOGIN
//
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(
      user._id,
      user.role
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//
// VENDOR REGISTER
//
const registerVendor = async (req, res) => {
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
    } = req.body;

    const existingVendor = await Vendor.findOne({
      email,
    });

    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "Vendor already exists",
      });
    }

    const vendor = await Vendor.create({
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
      isApproved: false,
    });

    res.status(201).json({
      success: true,
      message: "Vendor registered successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// VENDOR LOGIN
//
const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    if (!vendor.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Vendor approval pending",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor login successful",

      token: generateToken(vendor._id, vendor.role),

      vendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// ADMIN LOGIN
//
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === "admin@gmail.com" &&
//       password === "Admin@123"
//     ) {
//       const admin = {
//         _id: "64f1c2a9b123456789abcd12",
//         name: "Super Admin",
//         email: "admin@gmail.com",
//         role: "admin",
//       };

//       return res.status(200).json({
//         success: true,
//         message: "Admin login successful",

//         token: generateToken(admin._id, admin.role),

//         admin,
//       });
//     }

//     return res.status(400).json({
//       success: false,
//       message: "Invalid admin credentials",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const admin = await User.findOne({
//   email,
//   role: "admin",
// });

// if (!admin) {
//   return res.status(404).json({
//     success: false,
//     message: "Admin not found",
//   });
// }

// const isMatch = await bcrypt.compare(
//   password,
//   admin.password
// );

// if (!isMatch) {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid credentials",
//   });
// }

// return res.status(200).json({
//   success: true,
//   message: "Admin login successful",
//   token: generateToken(
//     admin._id,
//     admin.role
//   ),
//   admin,
// });
//
// LOGOUT
//
const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


//
// GET ALL USERS (ADMIN)
//
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// GET SINGLE USER
//
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// UPDATE USER
//
const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
    } = req.body;

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;

    user.email = email || user.email;

    user.phone = phone || user.phone;

    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// DELETE USER
//
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  registerCustomer,
  loginCustomer,
 registerVendor,
  loginVendor,
  // adminLogin,
  logoutUser,
   getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};