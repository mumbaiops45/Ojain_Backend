const mongoose = require("mongoose");

// ==========================================
// ORDER ITEM SCHEMA
// ==========================================
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

// ==========================================
// ORDER SCHEMA
// ==========================================
const orderSchema = new mongoose.Schema(
  {
    // USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ORDER ITEMS
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(val) => val.length > 0, "Order items cannot be empty"],
    },

    // TOTAL PRICE
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // DELIVERY ADDRESS
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
      default: null,
    },

    dealerCode: {
      type: String,
      default: "",
    },

    dealerCommission: {
      type: Number,
      default: 0,
    },

    // PAYMENT METHOD
    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "UPI"],
      required: true,
    },

    // PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    // ORDER STATUS
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Placed",
    },

    // OPTIONAL TRACKING ID
    trackingId: {
      type: String,
      default: "",
    },

    // DELIVERY DATE
    deliveredAt: {
      type: Date,
    },

    // CANCEL DATE
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// EXPORT MODEL
// ==========================================
module.exports = mongoose.model("Order", orderSchema);