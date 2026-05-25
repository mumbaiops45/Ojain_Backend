const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    transferReference: {
      type: String,
    },

    payoutDate: {
      type: Date,
      required: true,
    },

    weekStart: {
      type: Date,
      required: true,
    },

    weekEnd: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payout",
  payoutSchema
);