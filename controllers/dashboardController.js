const User = require('../models/User');
const Medicine = require('../models/Medicine');
const Order = require('../models/Order');
const Prescription = require('../models/Prescription');

exports.getAdminStats = async (req, res) => {
  try {
    const totalMedicines = await Medicine.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const revenueData = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    const totalRevenue = revenueData[0]?.total || 0;
    const lowStock = await Medicine.find({ stock: { $lt: 10 } });
    const recentOrders = await Order.find().populate('customerId', 'name email').sort('-createdAt').limit(5);

    // Monthly sales for chart
    const monthlySales = await Order.aggregate([
      { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]);

    res.json({ totalMedicines, totalOrders, totalCustomers, totalRevenue, lowStock, recentOrders, monthlySales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPharmacistStats = async (req, res) => {
  try {
    const pendingPrescriptions = await Prescription.find({ status: 'pending' }).populate('customerId', 'name email');
    const approvedPrescriptions = await Prescription.find({ status: 'approved', pharmacistId: req.user._id });
    const lowStock = await Medicine.find({ stock: { $lt: 10 } });
    res.json({ pendingPrescriptions, approvedPrescriptions, lowStock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
