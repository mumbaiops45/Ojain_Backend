const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    label: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    zipCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
    },

    landmark: {
      type: String,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ONLY ONE DEFAULT ADDRESS
addressSchema.pre(
  "save",
  async function () {

    if (this.isDefault) {

      await this.constructor.updateMany(
        {
          user: this.user,
          _id: { $ne: this._id },
        },
        {
          isDefault: false,
        }
      );
    }
  }
);

module.exports = mongoose.model(
  "Address",
  addressSchema
);