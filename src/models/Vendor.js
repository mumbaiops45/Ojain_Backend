// =============================================
// src/models/Vendor.js
// =============================================

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const vendorSchema =
  new mongoose.Schema(
    {
      fullName: {
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
        required: true,
      },

      shopName: {
        type: String,
        required: true,
        trim: true,
      },
      profileImage: {
  type: String,
  default: "",
},


      shopDescription: {
        type: String,
        maxlength: 300,
      },

      city: {
        type: String,
        required: true,
      },

      bankAccountNumber: {
        type: String,
        required: true,
      },

      ifscCode: {
        type: String,
        required: true,
      },

      accountHolderName: {
        type: String,
        required: true,
      },

      isApproved: {
        type: Boolean,
        default: false,
      },

      commissionRate: {
        type: Number,
        default: 10,
      },

      totalEarnings: {
        type: Number,
        default: 0,
      },

      pendingPayout: {
        type: Number,
        default: 0,
      },

      role: {
        type: String,
        default: "vendor",
      },
    },
    {
      timestamps: true,
    }
  );

// HASH PASSWORD
vendorSchema.pre(
  "save",
  async function () {
    if (
      !this.isModified(
        "password"
      )
    )
      return;

    this.password =
      await bcrypt.hash(
        this.password,
        10
      );
  }
);

module.exports =
  mongoose.model(
    "Vendor",
    vendorSchema
  );