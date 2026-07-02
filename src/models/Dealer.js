const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dealerSchema = new mongoose.Schema(
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
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    dealerCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bankName: {
      type: String,
      default: "",
    },

    accountHolderName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifscCode: {
      type: String,
      default: "",
    },

    commissionRate: {
      type: Number,
      default: 10,
    },

    walletBalance: {
      type: Number,
      default: 0,
    },

    totalCommission: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    referralCount: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["dealer"],
      default: "dealer",
    },
  },
  {
    timestamps: true,
  }
);

dealerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Dealer", dealerSchema);