const express = require("express");
const Payment = require("../models/Payment");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Mock payment endpoint – just marks paid
router.post("/mock-pay", protect, async (req, res) => {
  try {
    const { orderId, method } = req.body;
    const payment = await Payment.create({
      order: orderId,
      user: req.user.id,
      amount: req.body.amount,
      method,
      gateway: "Mock",
      transactionId: "MOCK_" + Date.now(),
      status: "Success",
    });
    res.json({ message: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;