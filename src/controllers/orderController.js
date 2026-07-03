const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const Dealer = require("../models/Dealer");
// Create order from cart
const createOrder = async (req, res) => {
  try {
    const {
      addressId,
      paymentMethod,
      dealerId,
      dealerCode
    } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const address = await Address.findOne({ _id: addressId, user: req.user.id });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // const order = await Order.create({
    //   user: req.user.id,
    //   items,
    //   totalAmount,
    //   address: addressId,
    //   paymentMethod,
    //   paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid", // mock for Card/UPI
    //   orderStatus: "Placed",
    // });

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address: addressId,

      dealer: dealerId || null,
      dealerCode: dealerCode || "",
      dealerCommission: 0,

      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Placed",
    });


    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



if (paymentMethod === "COD" && dealerId) {

    const dealer = await Dealer.findById(dealerId);

    if (dealer) {

        const commission =
            (totalAmount * dealer.commissionRate) / 100;

        order.dealerCommission = commission;

        dealer.walletBalance += commission;
        dealer.totalCommission += commission;
        dealer.totalOrders += 1;
        dealer.referralCount += 1;

        await dealer.save();
        await order.save();
    }
}
// Get user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("address");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate("address");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("address");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status/payment
const updateOrder = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrder, deleteOrder, updateOrderStatus };