// // // =============================================
// // // src/models/User.js
// // // =============================================

// // const mongoose = require("mongoose");

// // const bcrypt = require("bcryptjs");

// // // ADDRESS SCHEMA
// // const addressSchema =
// //   new mongoose.Schema({
// //     fullName: String,

// //     phone: String,

// //     street: String,

// //     city: String,

// //     state: String,

// //     pincode: String,

// //     country: {
// //       type: String,
// //       default: "India",
// //     },

// //     isDefault: {
// //       type: Boolean,
// //       default: false,
// //     },
// //   });

// // // USER SCHEMA
// // const userSchema =
// //   new mongoose.Schema(
// //     {
// //       name: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //       },

// //       email: {
// //         type: String,
// //         required: true,
// //         unique: true,
// //         lowercase: true,
// //         trim: true,
// //       },

// //       password: {
// //         type: String,
// //         required: true,
// //       },

// //       phone: String,

// //       addresses: [addressSchema],

// //       role: {
// //         type: String,
// //         enum: [
// //           "customer",
// //           "admin",
// //         ],

// //         default: "customer",
// //       },
// //     },
// //     {
// //       timestamps: true,
// //     }
// //   );

// // // HASH PASSWORD
// // userSchema.pre(
// //   "save",
// //   async function () {
// //     if (
// //       !this.isModified(
// //         "password"
// //       )
// //     )
// //       return;

// //     this.password =
// //       await bcrypt.hash(
// //         this.password,
// //         10
// //       );
// //   }
// // );

// // module.exports =
// //   mongoose.model(
// //     "User",
// //     userSchema
// //   );


// const mongoose = require("mongoose");

// const bcrypt = require("bcryptjs");

// // ADDRESS SCHEMA
// const addressSchema = new mongoose.Schema({
//   fullName: String,
//   phone: String,
//   street: String,
//   city: String,
//   state: String,
//   pincode: String,

//   country: {
//     type: String,
//     default: "India",
//   },

//   isDefault: {
//     type: Boolean,
//     default: false,
//   },
// });

// // USER SCHEMA
// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//     },

//     addresses: [addressSchema],

//     role: {
//       type: String,
//       enum: ["customer", "admin"],
//       default: "customer",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // HASH PASSWORD
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }

//     const salt = await bcrypt.genSalt(10);

//     this.password = await bcrypt.hash(this.password, salt);

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = mongoose.model("User", userSchema);






// =============================================
// src/models/User.js
// =============================================

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// ADDRESS SCHEMA
const addressSchema = new mongoose.Schema({
  fullName: String,

  phone: String,

  street: String,

  city: String,

  state: String,

  pincode: String,

  country: {
    type: String,
    default: "India",
  },

  isDefault: {
    type: Boolean,
    default: false,
  },
});

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    addresses: [addressSchema],

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD
userSchema.pre("save", async function () {
  // only hash if password changed
  if (!this.isModified("password")) {
    return;
  }

  // generate salt
  const salt = await bcrypt.genSalt(10);

  // hash password
  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

module.exports = mongoose.model(
  "User",
  userSchema
);