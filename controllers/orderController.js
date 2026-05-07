const Order = require('../models/Order');
const nodemailer = require('nodemailer');

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
  } catch (e) { console.log('Email error:', e.message); }
};

exports.createOrder = async (req, res) => {
  try {
    const { medicines, totalAmount, prescriptionId, address } = req.body;
    const order = await Order.create({
      customerId: req.user._id,
      medicines, totalAmount, prescriptionId, address,
    });
    await sendMail(req.user.email, 'Order Placed', `Your order #${order._id} has been placed successfully!`);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'name email').sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('customerId', 'email name');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await sendMail(order.customerId.email, 'Order Status Updated', `Your order #${order._id} status is now: ${order.status}`);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
