const Razorpay = require("razorpay");

const crypto = require("crypto");

const Order = require("../models/Order");

const Dealer = require("../models/Dealer");

// ================= RAZORPAY INSTANCE =================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_SECRET,
});

// ================= CREATE ORDER =================
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paise

      currency: "INR",

      receipt: "receipt_" + Date.now(),
    };

    const order =
      await razorpay.orders.create(options);

    res.status(200).json({
      success: true,

      orderId: order.id,

      amount: order.amount,

      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= VERIFY PAYMENT =================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      orderData,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    // VERIFY SIGNATURE
    if (
      expectedSignature === razorpay_signature
    ) {
      // CREATE ORDER IN DATABASE
      // const newOrder = await Order.create({
      //   ...orderData,

      //   paymentId: razorpay_payment_id,

      //   razorpayOrderId: razorpay_order_id,

      //   isPaid: true,
      // });

      if (newOrder.dealer) {

    const dealer = await Dealer.findById(newOrder.dealer);

    if (dealer) {

        const commission =
            (newOrder.totalAmount * dealer.commissionRate) / 100;

        newOrder.dealerCommission = commission;

        dealer.walletBalance += commission;
        dealer.totalCommission += commission;
        dealer.totalOrders += 1;
        dealer.referralCount += 1;

        await dealer.save();
        await newOrder.save();
    }
}

      return res.status(200).json({
        success: true,

        message: "Payment verified successfully",

        order: newOrder,
      });
    } else {
      return res.status(400).json({
        success: false,

        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  createRazorpayOrder,

  verifyPayment,
};