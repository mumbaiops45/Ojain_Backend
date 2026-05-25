const Payout = require("../models/Payout");

const Order = require("../models/Order");

// ================= PAYOUT SUMMARY =================
const getPayoutSummary = async (
  req,
  res
) => {
  try {
    const pendingOrders = await Order.find({
      status: "delivered",
      isPayoutDone: false,
    });

    const summary = {};

    pendingOrders.forEach((order) => {
      const vendorId =
        order.vendorId.toString();

      if (!summary[vendorId]) {
        summary[vendorId] = {
          vendorId,

          totalOrders: 0,

          totalAmount: 0,
        };
      }

      summary[vendorId].totalOrders += 1;

      summary[vendorId].totalAmount +=
        order.vendorEarning;
    });

    res.status(200).json(
      Object.values(summary)
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= MARK VENDOR PAID =================
const markVendorPaid = async (
  req,
  res
) => {
  try {
    const {
      vendorId,
      orders,
      totalAmount,
      transferReference,
      weekStart,
      weekEnd,
    } = req.body;

    const payout = await Payout.create({
      vendorId,
      orders,
      totalAmount,
      transferReference,
      payoutDate: new Date(),
      weekStart,
      weekEnd,
      status: "completed",
    });

    // UPDATE ORDERS
    await Order.updateMany(
      {
        _id: { $in: orders },
      },
      {
        isPayoutDone: true,
      }
    );

    res.status(201).json({
      message:
        "Vendor payout marked successfully",
      payout,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= MY PAYOUTS =================
const getMyPayouts = async (
  req,
  res
) => {
  try {
    const payouts = await Payout.find({
      vendorId: req.user.id,
    });

    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPayoutSummary,
  markVendorPaid,
  getMyPayouts,
};